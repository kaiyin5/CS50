def main():
    # create a variable to store key and value later
    dict = {}
    while True:
        try:
            # ask user for prompt
            item = input().upper()
            # end the flow when item is empty
            if not item:
                break
            # handle new key
            dict[item] += 1
        except KeyError:
            dict[item] = 1
            pass
        except EOFError:
            break
    # sort the dictionary and make a grocery dictionary to show
    groceryKey = list(dict.keys())
    groceryKey.sort()
    grocery = {i: dict[i] for i in groceryKey}

    for item in grocery:
        print(f"{grocery[item]} {item}")

main()