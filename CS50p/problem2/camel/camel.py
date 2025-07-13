def main():
    str = input("camelCase: ")
    snake(str)


def snake(str):
    print("snake_case: ", end="")
    for char in str:
        if char.isupper():
            print(f"_{char.lower()}", end="")
        else:
            print(char, end="")
    print("\n")


if __name__ == "__main__":
    main()