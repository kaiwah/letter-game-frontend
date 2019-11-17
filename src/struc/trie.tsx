
/**
 * TrieNode Structure
 * @class : TrieNode
 * @description : Basic node for trie
 */
class TrieNode {
  value : string;
  children : object;
  complete : boolean;
  constructor(value: string = ''){
    this.value = value || '';
    this.children = {};
    this.complete = false;
  }
}

/**
 * Trie Structure
 * @class Trie
 * @description : Basic trie structure for quick word validations
 */

class Trie {
  dict : any; 
  count : number;
  constructor(){
    this.dict = new TrieNode();
    this.count = 0;
  }
  /**
   * add() 
   * @word : <string>
   * @returns boolean
   * @description : add a word to the trie
   */
  add(word: string){
    let node = this.dict, 
        char;
    for (let i = 0; i < word.length; ++i){
      char = word[i];
      if (node.children[char])
        node = node.children[char];
      else {
        node.children[char] = new TrieNode(char);
        node = node.children[char];
      }
    }
    node.complete = true;
    ++this.count;
    console.log(`Word: ${word} added to dictionary!`);
    return true;
  }
  /**
   * has() 
   * @word : <string>
   * @returns object
   * @description : check if a word exists in trie
   */
  has(word: string){
    let node = this.dict, char;
    for (let i = 0; i < word.length; ++i){
      char = word[i];
      if (!node.chilren[char])
        return { found: false };
      else
        node = node.chilren[char];
    }
    return { found: true, completeWord: node.complete };
  }
  /**
   * remove() 
   * @description: not implementing -- unneeded for this exercise
   */
  remove(){ return null; }
}
export default Trie;
