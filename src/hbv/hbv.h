/*

  Hierarchical bit vector:
  Represents a bounded set of integers. Highly performant for sparse sets.

  An hbv may be conceptualized as "split" into multiple layers, in this
  example there are 4 layers for a length (2^4 - 1) bit vector:

  Layer 3: b0
  Layer 2: b1 b2
  Layer 1: b3 b4 b5 b6
  Layer 0: b7 b8 b9 b10 b11 b12 b13 b14

  Here the range of potential values is [0..7], which populate layer 0
  Layers 1 to 3 contain meta data about layer 0, the idea being to use
  these to speed up specific methods (such as `succ`).

  Reference: https://pdfs.semanticscholar.org/1137/5bc624d5b2a8cd5444e01dac8a836ed2ebde.pdf

*/

class HBitVector {
public:
  HBitVector(int);
  bool contains(int);
  void insert(int);
  void remove(int);
  int min(int);
  int succ(int);
private:
  int size;
  int levels; // levels <= 31
  std::vector<bool> set;
  int next(int);
  int parent(int);
  int sibling(int);
};
