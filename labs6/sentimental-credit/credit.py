def main():
    # request user to input a series of credit card number
    card_number = get_number()
    # calculate the number of digit of the card number for checksum
    card_digit = get_digit(card_number)
    # validation of the card number
    card_sum = checksum(card_number, card_digit)
    # classification of the card type and validation
    final_check(card_number, card_sum, card_digit)


def get_number():
    while True:
        try:
            num = int(input("Number: "))
            if (num > 0):
                return num
        except:
            ValueError


def get_digit(num):
    card_no = num
    digit = 0
    while card_no > 1:
        card_no /= 10
        digit += 1
    return digit


def checksum(card_number, digit):
    sum = 0  # for final check
    num = card_number  # save the card number for later calculation
    add = 0  # a variable used to deal with the two digits products

    """ handle the alternative second-to-last digits
     note that digits are in odd number counting from 0, and from right to left """
    for i in range(digit):
        if (i % 2 != 0):
            add = int((num % 10) * 2)
            if add > 9:
                add = int(add / 10 + add % 10)
            sum += add  # add the products' sum to the checking variable, sum
        num = int(num / 10)

    num = card_number

    for j in range(digit):
        if j % 2 == 0:
            add = num % 10
            sum += add  # add the value sum to the checking variable, sum
        num = int(num / 10)

    return sum


def final_check(card_number, sum, digit):
    first_num = 0  # find the first two digits of the card number from the left
    num = card_number
    for i in range(digit - 1):
        if i == (digit - 2):
            first_num = int(num)
        num /= 10

    if sum % 10 != 0:
        print("INVALID")
    elif first_num == 34 or first_num == 37:
        print("AMEX")
    elif first_num >= 51 and first_num <= 55:
        print("MASTERCARD")
    elif int(first_num / 10) == 4 and (digit == 16 or digit == 13):
        print("VISA")
    else:
        print("INVALID")


if __name__ == "__main__":
    main()