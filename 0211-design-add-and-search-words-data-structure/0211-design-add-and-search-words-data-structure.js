
var WordDictionary = function() {
    this.children = {};
    this.isEndOfWord = false;
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let curr = this;
    for(let char of word) {
        if(!curr.children[char]) {
            curr.children[char] = new WordDictionary();
        }
        curr = curr.children[char];
    }

    curr.isEndOfWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const dfs = (idx, curr) => {
        if(idx === word.length) {
            return curr.isEndOfWord;
        }

        const char = word[idx];

        if(char === '.') {
            for (const [key, value] of Object.entries(curr.children)) {
                if(dfs(idx + 1, curr.children[key])) {
                    return true;
                }
            }

            return false;
        }

        if(!curr.children[char]) {
            return false;
        }

        return dfs(idx + 1, curr.children[char]);
    }

    return dfs(0, this);
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */