pragma solidity >=0.6.4 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract STC is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
  
    constructor() ERC721('Token', 'NFT') {} // Change name and symbol to something related.
    receive() external payable {}
  

    struct NFT {
      address payable owner;
      string metadata;      // Owner, description, category, fileHash, etc.
      string category;      // Assignment, project, etc.
      string hash;
      string name;
    }
  
    mapping(string => bool) hashExists;
    mapping(uint256 => NFT) tokenIdToNft;
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
    

  function mintNFT(string memory _name, string memory _hash, string memory _metadata, string memory _category) external {
  
  // This function takes in generated hash, metadata, category and an input name for the token.
  
      require(hashExists[_hash] != true);
    
      hashExists[_hash] = true;
      _tokenIds.increment();
    
      uint256 newTokenId = _tokenIds.current();
      _safeMint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, _metadata);
    
      NFT storage nft = tokenIdToNft[newTokenId];
      nft.metadata = _metadata;
      nft.name = _name;
      nft.hash = _hash;
      nft.category = _category;
      tokenIdToNft[newTokenId].owner = payable(msg.sender);
      emit Transfer(address(this), msg.sender, newTokenId);
  }
  
  /*
  function burnNFT(uint256 _tokenId) external {
  // Deletes the Assignment.
  
      delete hashExists[tokenIdToNft[_tokenId].hash];
      delete tokenIdToNft[_tokenId];
      _burn(_tokenId);
  }*/
  
  
  function tokenOfOwnerByIndex(address _owner, uint256 _index) internal view returns (uint256) {
  
  // Used internally for owned_NFTs. Copied from ERC721Enumerable contract.
  
      require(_index < balanceOf(_owner));
      return _ownedTokens[_owner][_index];
  }
  
  function owned_NFTs() external view returns (uint256[] memory) {
  
  // This needs fix. No compile errors, but unexpected result.
  
      uint256[] memory nftList;
      uint listIndex = 0;
      uint256 tokenIndex;
      
      for (tokenIndex = 0; tokenIndex < balanceOf(msg.sender); tokenIndex++) {
          nftList[listIndex] = tokenOfOwnerByIndex(msg.sender, tokenIndex);
          listIndex++;
          }
      return nftList;
  }
  function NFT_details(uint256 _tokenId) external view returns (NFT memory) {
        // Returns NFT struct of the token ID.
        return tokenIdToNft[_tokenId];
    }
  function nfsByCategory(string memory category) external view returns (uint256[] memory) {
      // Logic 
  }
}