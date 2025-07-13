#include <cs50.h>
#include <stdio.h>

long get_number(void);
int get_digit(long num);
int checksum(long card_number, int digit);
void final_check(long card_number, int sum, int digit);

int main(void)
{
    // request user to input a series of credit card number
    const long card_number = get_number();
    // calculate the number of digit of the card number for checksum
    int card_digit = get_digit(card_number);
    // validation of the card number
    int card_sum = checksum(card_number, card_digit);
    // classification of the card type and validation
    final_check(card_number, card_sum, card_digit);
    // printf("%ld, %i, %i\n", card_number, card_sum, card_digit); // line for double checking
}


long get_number(void)
{
    long num;
    do
    {
        num = get_long("Number: ");
    }
    while (num < 1); // restrict the card number at least to be positive

    return num;
}

int get_digit(long num)
{
    int digit = 0;
    for (int i = 0; num > 0; i++)
    {
        num /= 10;
        digit++; // digit incrases by 1 once a non-zero number is divided by 10
    }

    return digit;
}

int checksum(long card_number, int digit)
{
    int sum = 0; // for final check
    long num = card_number; // save the card number for later calculation
    int add; // a variable used to deal with the two digits products

    // handle the alternative second-to-last digits
    // note that digits are in odd number counting from 0, and from right to left
    for (int i = 0; i < digit; i++)
    {
        if (i % 2 != 0)
        {
            add = (num % 10) * 2;
            if (add > 9)
            {
                add = add / 10 + add % 10;
            }
            sum += add; // add the products' sum to the checking variable, sum
        }
        num /= 10;
    }

    num = card_number; // reinitialize the value of num

    // handle the alternative first-to-last digits
    // note that digits are in even number counting from 0, and from right to left
    for (int j = 0; j < digit; j++)
    {
        if (j % 2 == 0)
        {
            add = num % 10;
            sum += add; // add the value sum to the checking variable, sum
        }
        num /= 10;
    }

    return sum;
}

void final_check(long card_number, int sum, int digit)
{
    int first_num; // find the first two digits of the card number from the left
    long num = card_number;
    for (int i = 0; i < digit - 1; i++)
    {
        if (i == digit - 2)
        {
            first_num = num;
        }
        num /= 10;
    }

    if (sum % 10 != 0)
    {
        printf("INVALID\n");
    }
    else if (first_num == 34 || first_num == 37)
    {
        printf("AMEX\n");
    }
    else if (first_num >= 51 && first_num <= 55)
    {
        printf("MASTERCARD\n");
    }
    else if (first_num / 10 == 4 && (digit == 16 || digit == 13))
    {
        printf("VISA\n");
    }
    else
    {
        printf("INVALID\n");
    }
}