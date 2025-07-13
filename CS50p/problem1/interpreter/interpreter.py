def main():
    exp = input("Expression: ")
    print(operation(exp))


def operation(exp):
    exp = exp.strip().split()
    x = float(exp[0])
    y = exp[1]
    z = float(exp[2])

    match y:
        case "+":
            return x + z
        case "-":
            return x - z
        case "*":
            return x * z
        case "/":
            return x / z

    return "WHAT?!"


main()
