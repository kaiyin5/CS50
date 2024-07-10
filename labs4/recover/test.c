#include <stdio.h>


typedef uint8_t BYTE;

int main(void)
{
    FILE *file = fopen("cs50.txt", "r");
    char *tmp;
    if (file != NULL)
    {
        char c;
        while (fread(&c, sizeof(char), 1, file))
        {
            printf("%c", c);
            printf("%lu", fread(&c, sizeof(char), 1, file));
        }
        fclose(file);
    }
}