def main():
    str = input("Input: ")
    twttr(str)


def twttr(str):
    print("Output: ", end="")
    for char in str:
        if char.lower() not in ['a', 'e', 'i', 'o', 'u']:
            print(char, end="")
    print("\n")


if __name__ == "__main__":
    main()