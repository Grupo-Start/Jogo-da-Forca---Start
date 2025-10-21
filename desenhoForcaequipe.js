function desenhoForca(tentativasRestantes) {
  console.clear();
  console.log("\n======== JOGO DA FORCA ========\n"); 

  if (tentativasRestantes === 6) {
    console.log(`
   ________
  |/       |
  |        
  |        
  |        
  |        
  |___________
  |___________|
    `);
  } else if (tentativasRestantes === 5) {
    console.log(`
   ________
  |/       |
  |        O
  |        
  |        
  |        
  |___________
  |___________|
    `);
  } else if (tentativasRestantes === 4) {
    console.log(`
   ________
  |/       |
  |        O
  |        |
  |        
  |        
  |___________
  |___________|
    `);
  } else if (tentativasRestantes === 3) {
    console.log(`
   ________
  |/       |
  |        O
  |       /|
  |        
  |        
  |___________
  |___________|
    `);
  } else if (tentativasRestantes === 2) {
    console.log(`
   ________
  |/       |
  |        O
  |       /|\\
  |        
  |        
  |___________
  |___________|
    `);
  } else if (tentativasRestantes === 1) {
    console.log(`
   ________
  |/       |
  |        O
  |       /|\\
  |       / 
  |        
  |___________
  |___________|
    `);
  } else if (tentativasRestantes ===0){
    console.log(`
   ________
  |/       |
  |        O
  |       /|\\
  |       / \\
  |        
  |___________
  |___________|
    
  GAME OVER!!`);
  }
}

module.exports = desenhoForca; 