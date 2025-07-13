def main():
    menu = {
        "Baja Taco": 4.25,
        "Burrito": 7.50,
        "Bowl": 8.50,
        "Nachos": 11.00,
        "Quesadilla": 8.50,
        "Super Burrito": 8.50,
        "Super Quesadilla": 9.50,
        "Taco": 3.00,
        "Tortilla Salad": 8.00
    }
    # delcare a variable for storing the total
    total = 0
    while True:
        try:
            # ask user for prompt when it's not empty prompt
            user_input = input("Item: ")
            # break the loop if no input
            if not user_input:
                break
            # check if item exist in the menu
            total += menu[user_input.title()]
        except KeyError:
            pass # continue the loop if input not in menu
        except EOFError:
            break # handle ctrl + D, ...
        else:
            print(f"Total: ${total:.2f}")

main()