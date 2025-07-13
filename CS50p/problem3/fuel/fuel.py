def main():
    result = get_input()
    # output in console base on requirement
    if result >= 0.99:
        print("F")
    elif result <= 0.01:
        print("E")
    else:
        print(f"{round(result * 100)}%")
    return

def get_input():
    while True:
        # ask for user input, until input is valid
        try:
            userInput = input("Fraction: ")
            value = userInput.split("/")
            result = int(value[0])/int(value[1])
            if result < 0:
                raise ValueError("Negative value")
            if result > 1:
                continue
        # check if input includes errors
        # ValueError: negative value, non integer
        # IndexError: the input doesn't include "/"
        except (ValueError, ZeroDivisionError, IndexError):
            continue
        else:
            return result

main()