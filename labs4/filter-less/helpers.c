#include "helpers.h"
#include <math.h>
#include <stdio.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    int grayscale;
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // divide the sum by 3.0 as to produce a temporary float result for round function
            grayscale = round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.0);
            // assign value from right to left
            image[i][j].rgbtRed = image[i][j].rgbtGreen = image[i][j].rgbtBlue = grayscale;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    // declare temporary variables
    int sepiaRed;
    int sepiaGreen;
    int sepiaBlue;

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // input the formula and save the results
            sepiaRed = round(.393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue);
            sepiaGreen = round(.349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue);
            sepiaBlue = round(.272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue);

            // cap the values of each color to be 255
            if (sepiaRed > 255)
            {
                sepiaRed = 255;
            }
            if (sepiaGreen > 255)
            {
                sepiaGreen = 255;
            }
            if (sepiaBlue > 255)
            {
                sepiaBlue = 255;
            }

            image[i][j].rgbtRed = sepiaRed;
            image[i][j].rgbtGreen = sepiaGreen;
            image[i][j].rgbtBlue = sepiaBlue;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int tmpR;
    int tmpG;
    int tmpB;

    for (int i = 0; i < height; i++)
    {
        // handle only half of the width, and odd number width means the middle pixel needs no reflection
        for (int j = 0, n = width / 2; j < n; j++)
        {
            // save the RGB on the left
            tmpR = image[i][j].rgbtRed;
            tmpG = image[i][j].rgbtGreen;
            tmpB = image[i][j].rgbtBlue;

            // change the value of the left to the right
            image[i][j].rgbtRed = image[i][width - 1 - j].rgbtRed;
            image[i][j].rgbtGreen = image[i][width - 1 - j].rgbtGreen;
            image[i][j].rgbtBlue = image[i][width - 1 - j].rgbtBlue;

            // change the value of the right to the left (the temp one)
            image[i][width - 1 - j].rgbtRed = tmpR;
            image[i][width - 1 - j].rgbtGreen = tmpG;
            image[i][width - 1 - j].rgbtBlue = tmpB;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // declare 2D arrays for saving the pixel RGB value
    int tmpR[height][width];
    int tmpG[height][width];
    int tmpB[height][width];

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // handle first row
            if (i == 0)
            {
                // top left corner
                if (j == 0)
                {
                    tmpR[i][j] = round(
                        (image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) /
                        4.0);
                    tmpG[i][j] = round((image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j].rgbtGreen +
                                        image[i + 1][j + 1].rgbtGreen) /
                                       4.0);
                    tmpB[i][j] = round((image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j].rgbtBlue +
                                        image[i + 1][j + 1].rgbtBlue) /
                                       4.0);
                }
                // top right corner
                else if (j == width - 1)
                {
                    tmpR[i][j] = round(
                        (image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed) /
                        4.0);
                    tmpG[i][j] = round((image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i + 1][j - 1].rgbtGreen +
                                        image[i + 1][j].rgbtGreen) /
                                       4.0);
                    tmpB[i][j] = round((image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i + 1][j - 1].rgbtBlue +
                                        image[i + 1][j].rgbtBlue) /
                                       4.0);
                }
                // edge on the 1st row
                else
                {
                    tmpR[i][j] = round((image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i][j + 1].rgbtRed +
                                        image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) /
                                       6.0);
                    tmpG[i][j] = round((image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen +
                                        image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen) /
                                       6.0);
                    tmpB[i][j] = round((image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue +
                                        image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) /
                                       6.0);
                }
            }

            // handle last row
            else if (i == height - 1)
            {
                // bottom left corner
                if (j == 0)
                {
                    tmpR[i][j] = round(
                        (image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i - 1][j].rgbtRed + image[i - 1][j + 1].rgbtRed) /
                        4.0);
                    tmpG[i][j] = round((image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i - 1][j].rgbtGreen +
                                        image[i - 1][j + 1].rgbtGreen) /
                                       4.0);
                    tmpB[i][j] = round((image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i - 1][j].rgbtBlue +
                                        image[i - 1][j + 1].rgbtBlue) /
                                       4.0);
                }
                // bottom right corner
                else if (j == width - 1)
                {
                    tmpR[i][j] = round(
                        (image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i - 1][j - 1].rgbtRed + image[i - 1][j].rgbtRed) /
                        4.0);
                    tmpG[i][j] = round((image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i - 1][j - 1].rgbtGreen +
                                        image[i - 1][j].rgbtGreen) /
                                       4.0);
                    tmpB[i][j] = round((image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i - 1][j - 1].rgbtBlue +
                                        image[i - 1][j].rgbtBlue) /
                                       4.0);
                }
                // edge on the last row
                else
                {
                    tmpR[i][j] = round((image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i][j + 1].rgbtRed +
                                        image[i - 1][j - 1].rgbtRed + image[i - 1][j].rgbtRed + image[i - 1][j + 1].rgbtRed) /
                                       6.0);
                    tmpG[i][j] = round((image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen +
                                        image[i - 1][j - 1].rgbtGreen + image[i - 1][j].rgbtGreen + image[i - 1][j + 1].rgbtGreen) /
                                       6.0);
                    tmpB[i][j] = round((image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue +
                                        image[i - 1][j - 1].rgbtBlue + image[i - 1][j].rgbtBlue + image[i - 1][j + 1].rgbtBlue) /
                                       6.0);
                }
            }

            // handle rows except the first and the last one
            else
            {
                // edge on the left
                if (j == 0)
                {
                    tmpR[i][j] = round((image[i - 1][j].rgbtRed + image[i][j].rgbtRed + image[i + 1][j].rgbtRed +
                                        image[i - 1][j + 1].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j + 1].rgbtRed) /
                                       6.0);
                    tmpG[i][j] = round((image[i - 1][j].rgbtGreen + image[i][j].rgbtGreen + image[i + 1][j].rgbtGreen +
                                        image[i - 1][j + 1].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j + 1].rgbtGreen) /
                                       6.0);
                    tmpB[i][j] = round((image[i - 1][j].rgbtBlue + image[i][j].rgbtBlue + image[i + 1][j].rgbtBlue +
                                        image[i - 1][j + 1].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j + 1].rgbtBlue) /
                                       6.0);
                }

                // edge on the right
                else if (j == width - 1)
                {
                    tmpR[i][j] = round((image[i - 1][j].rgbtRed + image[i][j].rgbtRed + image[i + 1][j].rgbtRed +
                                        image[i - 1][j - 1].rgbtRed + image[i][j - 1].rgbtRed + image[i + 1][j - 1].rgbtRed) /
                                       6.0);
                    tmpG[i][j] = round((image[i - 1][j].rgbtGreen + image[i][j].rgbtGreen + image[i + 1][j].rgbtGreen +
                                        image[i - 1][j - 1].rgbtGreen + image[i][j - 1].rgbtGreen + image[i + 1][j - 1].rgbtGreen) /
                                       6.0);
                    tmpB[i][j] = round((image[i - 1][j].rgbtBlue + image[i][j].rgbtBlue + image[i + 1][j].rgbtBlue +
                                        image[i - 1][j - 1].rgbtBlue + image[i][j - 1].rgbtBlue + image[i + 1][j - 1].rgbtBlue) /
                                       6.0);
                }

                // middle pixel
                else
                {
                    int avgR = 0;
                    int avgG = 0;
                    int avgB = 0;
                    // adding up the surrounding pixels' values
                    for (int m = -1; m < 2; m++)
                    {
                        for (int n = -1; n < 2; n++)
                        {
                            avgR += image[i + m][j + n].rgbtRed;
                            avgG += image[i + m][j + n].rgbtGreen;
                            avgB += image[i + m][j + n].rgbtBlue;
                        }
                    }
                    // assign blurred value by divide by 9
                    tmpR[i][j] = round(avgR / 9.0);
                    tmpG[i][j] = round(avgG / 9.0);
                    tmpB[i][j] = round(avgB / 9.0);
                }
            }
        }
    }

    for (int k = 0; k < height; k++)
    {
        for (int q = 0; q < width; q++)
        {
            image[k][q].rgbtRed = tmpR[k][q];
            image[k][q].rgbtGreen = tmpG[k][q];
            image[k][q].rgbtBlue = tmpB[k][q];
        }
    }
    return;
}
