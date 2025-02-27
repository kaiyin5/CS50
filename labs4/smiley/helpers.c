#include "helpers.h"
#include <stdio.h>

void colorize(int height, int width, RGBTRIPLE image[height][width])
{
    // Change all black pixels to a color of your choosing
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // change to black color to desire color as specified below
            if ( *&image[i][j].rgbtRed == 0 && *&image[i][j].rgbtGreen == 0 && *&image[i][j].rgbtBlue == 0)
            {
                // update the value (*) of adress (&) of the data (image[i][j])
                * &image[i][j].rgbtRed = 190;
                * &image[i][j].rgbtGreen = 216;
                * &image[i][j].rgbtBlue = 85;
            }
        }
    }
}
