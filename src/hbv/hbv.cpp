#include <vector>
#include <math.h>
#include "hbv.h"

// Create an empty set
HBitVector::HBitVector(int n) { // n <= 31
  this->levels = n-1;
  this->size = pow(2, n-1) - 1;
  this->set.resize(pow(2, n) - 1);
}

// Determine if an integer is in the set
bool HBitVector::contains(int n) {
  return this->set[this->size + n];
}

// Add an element to the set
void HBitVector::insert(int n) {
  int level = this->levels;
  int bit = n + this->size;
  while (level >= 0) {
    if (this->set[bit]) {
      break;
    } else {
      this->set[bit] = 1;
      bit = this->parent(bit);
      --level;
    }
  }
}

// Remove an element from the set
void HBitVector::remove(int n) {
  int level = this->levels;
  int bit = n + this->size;
  int sibling = this->sibling(bit);
  while (level >= 0) {
    this->set[bit] = 0;
    if (this->set[sibling]) {
      break;
    } else {
      bit = this->parent(bit);
      sibling = this->sibling(bit);
      --level;
    }
  }
}

// Find the smallest element in the set rooted at node n
int HBitVector::min(int n = 0) {
  if (this->set[n]) {
    while (n <= this->size) {
      n += n + 1;
      if (!this->set[n]) {
        n += 1;
      }
    }
  } else {
    return -1;
  }
  return n - this->size;
}

// Find the smallest element in the set that is greater than n
int HBitVector::succ(int n) {
  int x = n;
  int bit = 0;
  n += this->size;
  while (!bit) {
    n = this->next(n);
    bit = this->set[n];
  }
  if (n >= this->size) {
    return n;
  } else if (x < n) {
    return this->min(n);
  } else {
    return -1;
  }
}

int HBitVector::next(int n) {
  if (n % 2) {
    return n + 1; // sibling
  } else {
    return this->parent(n) + 1;
  }
}

int HBitVector::parent(int n) {
  return (n - 1) / 2;
}

int HBitVector::sibling(int n) {
  if (n % 2) {
    return n + 1;
  } else {
    return n - 1;
  }
}
