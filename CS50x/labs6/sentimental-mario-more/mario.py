# request user prompt
while True:
    try:
        h = int(input("Height: "))
        if (h >= 1 and h <= 8):
            break
    except:
        ValueError

# print blocks
for i in range(h):
    for j in range(h):
        if h > i + j + 1:
            print(" ", end="")
        else:
            print("#", end="")
    print("  " + "#" * (i + 1))