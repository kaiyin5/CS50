def main():
    plate = input("Plate: ")
    if is_valid(plate):
        print("Valid")
    else:
        print("Invalid")


def is_valid(s):
    # No periods, spaces, or punctuation marks are allowed.
    if not s.isalnum():
        # print("a")
        return False

    # All vanity plates must start with at least two letters.
    for char in s[:2]:
        if not char.isalpha():
            # print("b")
            return False

    # vanity plates may contain a maximum of 6 characters (letters or numbers)
    if len(s) > 6 or len(s) < 2:
        # print("c")
        return False

    # Numbers cannot be used in the middle of a plate; they must come at the end.
    # For example, AAA222 would be an acceptable vanity plate;
    # AAA22A would not be acceptable. The first number used cannot be a ‘0’.
    startNum = False
    for char in s[2:]:
        if not startNum:
            if char == '0':
                # print("d")
                return False
            if char.isnumeric():
                startNum = True
        else:
            if char.isalpha():
                # print("e")
                return False

    return True

main()