def main():
    # Getting user input
    text = input("Text: ")
    # Counting letters
    letter = count_letters(text)
    # Counting words
    word = count_words(text)
    # Counting sentences
    sentence = count_sentences(text)
    # Print the grade
    count_grade(letter, word, sentence)


def count_letters(text):
    cnt = 0
    for i in range(len(text)):
        # increase letter counter by 1 when the char is alphabat
        if (text[i] >= 'A' and text[i] <= 'Z') or (text[i] >= 'a' and text[i] <= 'z'):
            cnt += 1
    return cnt


def count_words(text):
    # assuming that a sentence will contain at least one word
    cnt = 1

    # assuming that a sentence will not start or end with a space
    for i in range(len(text) - 1):
        # assuming that a sentence will not have multiple spaces in a row
        if text[i] == ' ' and text[i - 1] != ' ':
            cnt += 1

    return cnt


def count_sentences(text):
    cnt = 0
    for i in range(len(text)):
        # increase letter counter by 1 when the char is either '.', '!' or '?'
        if text[i] == '.' or text[i] == '!' or text[i] == '?':
            cnt += 1
    return cnt


def count_grade(letter, word, sentence):
    l = letter / word * 100
    s = sentence / word * 100
    grade = round(0.0588 * l - 0.296 * s - 15.8)

    if grade < 1:
        print("Before Grade 1")
    elif grade >= 1 and grade <= 16:
        print(f"Grade {grade}")
    else:
        print("Grade 16+")


if __name__ == "__main__":
    main()