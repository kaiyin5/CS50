#include <cs50.h>
#include <stdio.h>
#include <string.h>

int main(int argc, string argv[])
{
    // validation of key
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    int length = strlen(argv[1]);
    // check if the string is having 26 chars
    if (length != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }

    // check if input string consists of only alphabetic characters
    for (int i = 0; i < 26; i++)
    {
        if (!(argv[1][i] >= 65 && argv[1][i] <= 90) && !(argv[1][i] >= 97 && argv[1][i] <= 122))
        {
            printf("Key must contain only alphabetic characters.\n");
            return 1;
        }
    }

    // standardize the key by changing all letters to uppercase
    char key[26];
    for (int i = 0; i < 26; i++)
    {
        // changing lowercase to uppercase, need to minus the char value by 32
        if (argv[1][i] >= 97 && argv[1][i] <= 122)
        {
            key[i] += argv[1][i] - 32;
        }
        else
        {
            key[i] += argv[1][i];
        }
    }

    // check if every character is unique
    for (int i = 1; i < 26; i++)
    {
        for (int j = 0; j < i; j++)
        {
            if (key[j] == key[i])
            {
                printf("Each alphabetic character can only exist once.\n\'%c\' repeats at place %i.\n", argv[1][j], j + 1);
                return 1;
            }
        }
    }

    // request input of plain text
    string plaintext = get_string("plaintext:  ");
    int len_text = strlen(plaintext);
    char ciphertext[len_text];

    // substitution
    for (int i = 0; i < len_text; i++)
    {
        /* Doing the encryption, where the index of character in plaintext must first change to ciphertext
        by the key. Then change the key from uppercase to lowercase gap by + 32 when it's lowercase in
        the plaintext. */
        if (plaintext[i] >= 97 && plaintext[i] <= 122)
        {
            ciphertext[i] = key[plaintext[i] - 97] + 32;
        }
        else if (plaintext[i] >= 65 && plaintext[i] <= 90)
        {
            ciphertext[i] = key[plaintext[i] - 65];
        }
        else
        {
            ciphertext[i] = plaintext[i];
        }
    }

    // using this tedious method to avoid invalid ASCII codes
    printf("ciphertext: ");
    for (int i = 0; i < len_text; i++)
    {
        printf("%c", ciphertext[i]);
    }
    printf("\n");
}