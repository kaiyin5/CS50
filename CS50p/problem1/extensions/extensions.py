def main():
    answer = input("File name: ")
    print(check(answer))


def check(ans):
    ans = (ans.lower().strip()).split(".")
    if len(ans) < 2:
        return "application/octet-stream"
    match ans[-1]:
        case "gif":
            return "image/gif"
        case "jpg" | "jpeg":
            return "image/jpeg"
        case "png":
            return "image/png"
        case "txt":
            return "text/plain"
        case "pdf" | "zip":
            return "application/" + ans[-1]
    return "application/octet-stream"


main()
