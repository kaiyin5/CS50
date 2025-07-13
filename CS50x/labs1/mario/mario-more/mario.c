#include <cs50.h>
#include <stdio.h>

int get_height(void); // include the functions at top
void print_brick(int n);

int main(void)
{
    int height = get_height(); // request user to input the pyramid height
    print_brick(height); // generate the pyramid according to requested height
}

int get_height(void)
{
    int height;
    do
    {
        height = get_int("Height: ");
    }
    while (height < 1 || height > 8);
    return height;
}

void print_brick(int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++) // print bricks on left hand side
            if (n > i + j + 1)
            {
                printf(" ");
            }
            else
            {
                printf("#");
            }

        printf("  "); // print gap in between

        for (int k = 0; k < i + 1; k++) // print bricks on right hand side
        {
            printf("#");
        }

        printf("\n");
    }

}