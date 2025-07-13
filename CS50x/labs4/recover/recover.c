#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <cs50.h>

typedef uint8_t BYTE;
int BLOCK_SIZE = 512;

int main(int argc, char *argv[])
{
    // Check valid input
    if (argc != 2)
    {
        printf("Usage: ./recover IMAGE\n");
        return 1;
    }
    // Open memory card
    FILE *f = fopen(argv[1], "r");
    // 512 bytes in a buffer
    BYTE buffer[BLOCK_SIZE];
    // check first JPEG, turn to false when first JPEG is read
    bool first_jpeg = true;
    int jpeg_num = 0;
    // initialize output file
    char out_file[8];
    FILE *img;
    // Read 512 bytes into a buffer until end of card
    while (fread(buffer, sizeof(BYTE), BLOCK_SIZE, f) == BLOCK_SIZE)
    {

        // check start of new JPEG
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // check first JPEG
            if (first_jpeg)
            {
                // change status of first_jpeg
                first_jpeg = false;
                // Making new JPEG
                sprintf(out_file, "%03i.jpg", jpeg_num);
                img = fopen(out_file, "w");
                // Writing JPEG
                fwrite(buffer, sizeof(BYTE), BLOCK_SIZE, img);
            }
            // starting from second JPEG
            else
            {
                // close previous JPEG
                fclose(img);
                // update JPEG filename
                jpeg_num++;
                // Making new JPEG
                sprintf(out_file, "%03i.jpg", jpeg_num);
                img = fopen(out_file, "w");
                // Writing JPEG
                fwrite(buffer, sizeof(BYTE), BLOCK_SIZE, img);
            }
        }
        // already found JPEG
        else
        {
            // only write after first jpeg found
            if (!first_jpeg)
            {
                fwrite(buffer, sizeof(BYTE), BLOCK_SIZE, img);
            }
        }
    }
    // memory troubleshooting
    fclose(f);
    fclose(img);
}