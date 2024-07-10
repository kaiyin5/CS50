// Implements a dictionary's functionality
#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Handling first letter in hash table
const unsigned int N = 26;

// Hash table
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    int num = hash(word);
    node *cursor = table[num];
    while (cursor != NULL)
    {
        if (strcasecmp(word, cursor->word) == 0)
        {
            return true;
        }
        cursor = cursor->next;
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    int num = toupper(word[0]) - 'A';
    return num;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // Open dictionaries file
    FILE *f = fopen(dictionary, "r");
    if (f == NULL)
    {
        return false;
    }

    // Read strings from file
    char buffer[LENGTH + 1];
    while (fscanf(f, "%s", buffer) != EOF)
    {
        // Create a new node
        node *n = malloc(sizeof(node));
        if (n == NULL)
        {
            return false;
        }
        n->next = NULL;
        strcpy(n->word, buffer);
        // Hash word
        int num = hash(n->word);
        // Insert node into hash table
        if (table[num] != NULL)
        {
            n->next = table[num];
            table[num] = n;
        }
        else
        {
            table[num] = n;
        }
    }

    fclose(f);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    int num = 0;
    node *n = NULL;
    for (int i = 0; i < N; i++)
    {
        if (table[i] == NULL)
        {
            continue;
        }
        n = table[i];
        while (n->next != NULL)
        {
            // increment for a new node
            n = n->next;
            num++;
        }
        // increment for the node with NULL node pointer at the end of linked lists
        num++;
    }
    return num;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    node *n = NULL;
    for (int i = 0; i < N; i++)
    {
        n = table[i];
        while (n != NULL)
        {
            node *next = n->next;
            free(n);
            n = next;
        }
    }
    return true;
}
