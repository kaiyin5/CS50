import csv
import sys


def main():

    # Check for command-line usage
    if len(sys.argv) != 3:
        print("Usage: python dna.py data.csv sequence.txt")
        return 1

    # Read database file (df) into a variable
    with open(sys.argv[1]) as df:
        reader = csv.reader(df)
        db = []
        for row in reader:
            db.append(row)
    # Save STRs into a list
    strlist = db[0][1:]
    # Save person data into a dictionary
    person = {}
    for i in range(len(db)):
        if i != 0:
            person[f"{db[i][0]}"] = db[i][1:]

    # Read DNA sequence file (sf) into a variable
    with open(sys.argv[2]) as sf:
        sequence = sf.read()

    # Find longest match of each STR in DNA sequence
    result = []
    for x in strlist:
        result.append(str(longest_match(sequence, x)))

    # Check database for matching profiles
    for y in person:
        if person[y] == result:
            print(y)
            return 0

    print("No match")
    return 1


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()