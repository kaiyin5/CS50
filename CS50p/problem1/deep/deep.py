def main():
    answer = input("What is the Answer to the Great Question of Life, the Universe, and Everything? ")
    print("Yes" if check(answer) else "No")

def check(ans):
    match ans.lower().strip():
        case "42" | "forty-two" | "forty two":
            return True
    return False

main()