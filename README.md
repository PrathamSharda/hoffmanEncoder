# Huffman Encoder

The **Huffman Encoder** is a lossless data compression algorithm used to reduce the size of data files. This algorithm creates an optimal prefix-free binary tree to represent characters from the input file. More frequent characters are assigned shorter codes, and less frequent characters are assigned longer codes, leading to efficient compression.

### Table of Contents
- [Introduction](#introduction)
- [Algorithm Explanation](#algorithm-explanation)
- [Installation](#installation)



---

## Introduction

The Huffman Encoding algorithm compresses text data by creating a binary tree based on the frequency of characters. Each character is represented by a variable-length binary string called a **Huffman code**. The most frequent characters are placed closer to the root of the tree, and the less frequent ones are further away.

---

## Algorithm Explanation

1. **Build a Frequency Table**: 
   - First, the algorithm scans the input data to calculate the frequency of each character.

2. **Build the Huffman Tree**: 
   - A binary tree is built where each leaf node contains a character and its frequency. The tree is constructed by repeatedly combining the two nodes with the lowest frequencies. Internal nodes represent merged nodes and are assigned a frequency equal to the sum of their children's frequencies.

3. **Generate Huffman Codes**:
   - After constructing the Huffman tree, a binary code is assigned to each character. The path from the root to the character's leaf node gives the character’s code. Left branches are assigned `0`, and right branches are assigned `1`.

4. **Compression**:
   - The original file is compressed by replacing each character with its corresponding Huffman code. The compressed data is then saved in a binary format, while the codes are stored in a text file.

5. **Decompression**:
   - To decompress, the algorithm uses the Huffman codes and the binary data to reconstruct the original text.

---

## Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

### Steps
1. **Make a folder**
   ```bash
   mkdir <foldername> #to store the huffman encoder

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/PrathamSharda/hoffmanEncoder.git

3. **install dependencies**:
   ```bash
   npm install
   
4. **uderstanding interface**:
   ```bash
   node compress.cjs --help
   
5. **creating a testfolder**:
   ```bash
   mkdir <test Foldername> #create a test folder and add text files in them
   cd <test folderName>
   touch <test .txt filename>
   
6. **compression of files**:
   ```bash
   node compress.cjs -c <foldername> #replace folder name with test folder name
   
7. **decompression of files**:
   ```bash
   node compress.cjs -d <foldername> #replace folder name with test folder name



