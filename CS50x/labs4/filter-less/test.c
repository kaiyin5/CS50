#include <stdio.h>
#include <math.h>

int main(void)
{
    int x = 3 / 2;
    int y = round(101 / 3.0);
    int z[] = {0, 1, 2, 3, 4, 5};
    printf("x: %i, y: %i, z: %i\n", x, y, z[6-5]);
}