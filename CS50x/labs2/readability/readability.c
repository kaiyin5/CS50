#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <math.h>


int count_letters(string text);
int count_words(string text);
int count_sentences(string text);
void count_grade(int letter, int word, int sentence);

int main(void)
{
    // Getting User Input
    string text = get_string("Text: ");

    // Counting letters
    int letter = count_letters(text);

    // Counting words
    int word = count_words(text);

    // Counting sentences
    int sentence = count_sentences(text);

    // Print the grade
    count_grade(letter, word, sentence);
}

int count_letters(string text)
{
    int cnt = 0;

    for (int i = 0, len = strlen(text); i < len; i++)
    {
        // increase letter counter by 1 when the char is alphabat
        if ((text[i] >= 65 && text[i] <= 90) || (text[i] >= 97 && text[i] <= 122))
        {
            cnt++;
        }
    }

    return cnt;
}

int count_words(string text)
{
    // assuming that a sentence will contain at least one word
    int cnt = 1;

    // assuming that a sentence will not start or end with a space
    for (int i = 1, len = strlen(text); i < len - 1; i++)
    {
        // assuming that a sentence will not have multiple spaces in a row
        if ((text[i] == ' ') && (text[i - 1] != ' '))
        {
            cnt++;
        }
    }

    return cnt;
}

int count_sentences(string text)
{
    int cnt = 0;

    for (int i = 0, len = strlen(text); i < len; i++)
    {
        // increase letter counter by 1 when the char is either '.', '!' or '?'
        if ((text[i] == '.') || (text[i] == '!') || (text[i] == '?'))
        {
            cnt++;
        }
    }

    return cnt;
}

void count_grade(int letter, int word, int sentence)
{
    float L = (float) letter / (float) word * 100.0;
    float S = (float) sentence / (float) word * 100.0;
    float G = 0.0588 * L - 0.296 * S - 15.8;
    int grade = round(G);

    // uncomment next line for final checking
    // printf("letter: %i, word: %i, sentence: %i\nfloating Grade %f\n", letter, word, sentence, G);

    if (grade < 1)
    {
        printf("Before Grade 1\n");
    }
    else if ((grade >= 1) && (grade <= 16))
    {
        printf("Grade %i\n", grade);
    }
    else
    {
        printf("Grade 16+\n");
    }
}