
var Trie = function() {
    this.children = {}; // 다음 글자들을 저장할 공간 (Hash Map)
    this.isEndOfWord = false; // 여기서 단어가 끝나는지 표시
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let curr = this;
    for (let char of word) {
        if (!curr.children[char]) {
            curr.children[char] = new Trie();
        }
        curr = curr.children[char];
    }
    curr.isEndOfWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let curr = this;
    for (let char of word) {
        if (!curr.children[char]) {
            return false;
        }
        curr = curr.children[char];
    }

    return curr.isEndOfWord;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let curr = this;
    for (let char of prefix) {
        if (!curr.children[char]) {
            return false;
        }
        curr = curr.children[char];
    }

    return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */