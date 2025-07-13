def main():
    greet = input("Greeting: ")
    print(bank(greet))

def bank(greet):
    ans = greet.lower().strip()
    if ans[0] != "h":
        return "$100"
    elif ans[0:5] != "hello":
        return "$20"
    else:
        return "$0"

main()