import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd
from datetime import datetime


# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # Identify user
    user_id = session["user_id"]

    # Get data from SQL db
    cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)
    cash = cash[0]["cash"]
    tmp_symbols = db.execute(
        "SELECT DISTINCT symbol FROM holdings WHERE user_id = ?", user_id
    )

    # Create a list to store distinct stocks
    symbols = []
    for i in range(len(tmp_symbols)):
        symbols.append(tmp_symbols[i]["symbol"])

    # Create a list to store shares of distinct stocks
    shares = []
    for x in symbols:
        share = db.execute(
            "SELECT SUM(shares) FROM holdings WHERE user_id = ? AND symbol = ?",
            user_id,
            x,
        )
        shares.append(share[0]["SUM(shares)"])

    # Create a dict to store stocks' symbol, name, share and price
    holdings = []
    # Amount of value in holdings
    amount = 0
    for k in range(len(symbols)):
        dict = {}
        dict["symbol"] = symbols[k]
        dict["name"] = symbols[k]
        dict["shares"] = shares[k]
        price = lookup(symbols[k])["price"]
        dict["price"] = price
        amount += shares[k] * price
        holdings.append(dict)

    total = cash + amount
    return render_template("index.html", holdings=holdings, cash=cash, total=total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure symbol was submitted
        if not request.form.get("symbol"):
            return apology("must provide symbol", 400)

        # Ensure share was submitted
        elif not request.form.get("shares"):
            return apology("must provide share", 400)

        # Validation of symbol
        stock = lookup(request.form.get("symbol"))
        if stock == None:
            return apology("invalid symbol", 400)

        # Create variables for transaction
        share = request.form.get("shares")
        check_num = share.isnumeric()
        # Validation of share
        if check_num == False:
            return apology("invalid shares", 400)
        share = int(share)
        amount = stock["price"] * share
        user_id = session["user_id"]

        # Check if user can afford the buy
        cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)
        cash = cash[0]["cash"]
        if cash < amount:
            return apology("can't afford", 400)

        # Update the cash and transaction record
        else:
            cash = cash - amount
            db.execute("UPDATE users SET cash = ? WHERE id = ?", cash, user_id)
            # Update the holdings
            current_time = datetime.now()
            db.execute(
                "INSERT INTO holdings (user_id, symbol, name, shares, price, time) VALUES (?, ?, ?, ?, ?, ?)",
                user_id,
                stock["symbol"],
                stock["name"],
                share,
                stock["price"],
                current_time,
            )
        # Redirect to index
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    # Identify user
    user_id = session["user_id"]
    holdings = db.execute("SELECT * FROM holdings WHERE user_id = ?", user_id)

    return render_template("history.html", holdings=holdings)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 400)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure symbol was submitted
        if not request.form.get("symbol"):
            return apology("must provide symbol", 400)

        # Validation of symbol
        symbol = lookup(request.form.get("symbol"))
        if symbol == None:
            return apology("invalid symbol", 400)

        # Passing values into template
        return render_template("quoted.html", stock=symbol)

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Ensure password and its confirmation were the same
        elif request.form.get("password") != request.form.get("confirmation"):
            return apology("password and confirmation do not match", 400)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username does NOT exists
        if len(rows) != 0:
            return apology("username is used", 400)

        # Add user to database
        username = request.form.get("username")
        db.execute(
            "INSERT INTO users (username, hash) VALUES (?, ?)",
            username,
            generate_password_hash(request.form.get("password")),
        )

        # Log user in
        session["user_id"] = db.execute(
            "SELECT id FROM users WHERE username = ?", username
        )

        # Redirect user to home page (index)
        return redirect("/", 200)

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    # Identify user
    user_id = session["user_id"]

    # Get data from SQL db
    holdings = db.execute("SELECT * FROM holdings WHERE user_id = ?", user_id)
    cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)
    cash = cash[0]["cash"]

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure symbol was submitted
        if not request.form.get("symbol"):
            return apology("missing symbol", 400)
        # Ensure share was submitted
        elif not request.form.get("shares"):
            return apology("missing shares", 400)

        # Save updated price and shares to be sold
        stock = lookup(request.form.get("symbol"))
        price = stock["price"]
        shares = int(request.form.get("shares"))

        # Check if the user have enough shares to sell
        user_shares = db.execute(
            "SELECT SUM(shares) FROM holdings WHERE user_id = ? AND symbol = ?",
            user_id,
            stock["symbol"],
        )
        user_shares = int(user_shares[0]["SUM(shares)"])
        if user_shares < shares:
            return apology("too many shares", 400)
        # Update the user cash and holdings
        else:
            amount = price * shares
            cash = cash + amount
            db.execute("UPDATE users SET cash = ? WHERE id = ?", cash, user_id)
            # Update the holdings
            current_time = datetime.now()
            # Change shares to negative number
            shares = 0 - shares
            db.execute(
                "INSERT INTO holdings (user_id, symbol, name, shares, price, time) VALUES (?, ?, ?, ?, ?, ?)",
                user_id,
                stock["symbol"],
                stock["name"],
                shares,
                price,
                current_time,
            )

        # Redirect to index
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("sell.html", holdings=holdings)


@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    # Identify user
    user_id = session["user_id"]
    cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)
    cash = cash[0]["cash"]

    if request.method == "POST":
        add = request.form.get("add")
        check_add = add.isnumeric()
        # Validation of share
        if check_add == False:
            return apology("invalid amount", 400)
        # Adding process
        else:
            db.execute(
                "UPDATE users SET cash = ? WHERE id = ?",
                (int(cash) + int(add)),
                user_id,
            )

        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("add.html", cash=cash)
