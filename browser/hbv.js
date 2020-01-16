class HierarchicalBitVector {
  // Create an empty set with n layers, permitting 0 <= i < 2^(n-1)
  constructor(n) {
    this.levels = n-1;
    this.N = 2**(n-1) - 1;
    this.vector = new Uint8Array(2**n - 1);
  }

  // Determine if an integer is in the set
  contains(n) {
    if (0 <= n && n <= this.N) {
      return this.vector[this.N + n] > 0;
    } else {
      outOfBoundsError(n);
    }
  }

  // Add an element to the set
  insert(n) {
    if (0 <= n && n <= this.N) {
      let level = this.levels;
      let bit = n + this.N;
      while (level >= 0) {
        if (this.vector[bit]) {
          break;
        } else {
          this.vector[bit] = 1;
          level -= 1;
          bit = Math.floor((bit - 1) / 2);
        }
      }
    } else {
      outOfBoundsError(n);
    }
  }

  inserts(iterable) {
    if (typeof Symbol.iterator !== 'undefined' &&
        typeof iterable[Symbol.iterator] === 'function') {
      for (const n of iterable) this.insert(n);
    } else {
      throw new Error(`${iterable} not iterable`);
    }
  }

  // Remove an element from the set
  delete(n) {
    if (0 <= n && n <= this.N) {
      let level = this.levels;
      let bit = n + this.N;
      let sibling = bit % 2 ? 1 : -1;
      while (level >= 0) {
        this.vector[bit] = 0;
        if (this.vector[bit + sibling]) {
          break;
        } else {
          level -= 1;
          bit = Math.floor((bit - 1) / 2);
          sibling = bit % 2 ? 1 : -1;
        }
      }
    } else {
      outOfBoundsError(n);
    }
  }

  // Find the smallest element in the set rooted at node n
  min(n = 0) {
    if (this.vector[n]) {
      while (n <= this.N) {
        n = 2*n + 1; // n <- left(n)
        if (!this.vector[n]) {
          n += 1; // n <- sibling(n)
        }
      }
    } else {
      return -1;
    }
    return n - this.N;
  }

  next(n) {
    if (n % 2) {
      // n is the left child in the subtree
      return n + 1; // n <- sibling(n)
    } else {
      // n is the right child in the subtree
      return Math.floor((n - 1) / 2) + 1; // n <- parent(n) + 1
    }
  }

  // Find the smallest element in the set that is greater than n
  succ(n) {
    if (0 <= n && n <= this.N) {
      let x = n;
      let bit;
      n += this.N;
      while (!bit) {
        n = this.next(n);
        bit = this.vector[n];
      }
      if (n >= this.N) {
        return n - this.N;
      } else {
        return x < n-1 ? this.min(n) : -1;
      }
    } else {
      outOfBoundsError(n);
    }
  }
}

const outOfBoundsError = n => {
  throw new Error(`${n} out of bounds`);
}

module.exports = HierarchicalBitVector;
