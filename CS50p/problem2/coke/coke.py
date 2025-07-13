def main():
    due = 50
    while due > 0:
        print(f"Amount Due: {due}")
        coin = input("Insert Coin: ")
        due -= coke(coin)
    print(f"Change Owed: {-due}")

def coke(coin):
    match coin:
        case "25":
            return 25
        case "10":
            return 10
        case "5":
            return 5
    return 0


if __name__ == "__main__":
    main()