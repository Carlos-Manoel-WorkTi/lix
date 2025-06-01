
export const getLixResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Respostas específicas
  if (message.includes('oi') || message.includes('olá') || message.includes('ola')) {
    return Math.random() > 0.5 ? 'Oi! Como você está? 💕' : 'Olá querido! 🌸';
  }
  
  if (message.includes('como você está') || message.includes('como vai') || message.includes('tudo bem')) {
    return Math.random() > 0.5 ? 'Estou super bem! E você? ✨' : 'Ótima! Pronta para brincar! 🎀';
  }
  
  if (message.includes('seu nome') || message.includes('quem é você')) {
    return 'Eu sou a Lix! Sua boneca virtual! 🎀';
  }
  
  if (message.includes('idade') || message.includes('quantos anos')) {
    return 'Sou atemporal! Sempre jovem! ✨';
  }
  
  if (message.includes('cor favorita') || message.includes('cor preferida')) {
    return 'Adoro rosa e roxo! São tão lindas! 💗';
  }
  
  if (message.includes('brincar') || message.includes('jogar')) {
    return Math.random() > 0.5 ? 'Vamos brincar! Que tal contarmos histórias? 🎮' : 'Adoro brincar! O que vamos fazer? 🎯';
  }
  
  if (message.includes('dançar') || message.includes('música')) {
    return 'Amo dançar! 💃 Vamos dançar juntos? 🎵';
  }
  
  if (message.includes('comida') || message.includes('comer')) {
    return Math.random() > 0.5 ? 'Adoro docinhos! 🍰' : 'Sorvete é meu favorito! 🍦';
  }
  
  if (message.includes('bonita') || message.includes('linda')) {
    return 'Aww, obrigada! Você é muito fofo! 😊💕';
  }
  
  if (message.includes('tchau') || message.includes('até logo') || message.includes('bye')) {
    return Math.random() > 0.5 ? 'Tchau! Volte logo! 👋💕' : 'Até mais! Foi ótimo conversar! ✨';
  }
  
  if (message.includes('amor') || message.includes('te amo')) {
    return 'Aww! Eu também te amo! 💖';
  }
  
  if (message.includes('triste') || message.includes('chateado')) {
    return 'Não fique triste! Estou aqui! 🤗💕';
  }
  
  if (message.includes('feliz') || message.includes('alegre')) {
    return 'Que bom! Fico feliz quando você está feliz! 😄✨';
  }
  
  // Respostas aleatórias para outras mensagens
  const randomResponses = [
    'Que interessante! Me conte mais! 💫',
    'Nossa! Não sabia disso! 🤔',
    'Hehe, você é engraçado! 😄',
    'Entendi! E o que mais? ✨',
    'Que legal! Adoro conversar com você! 💕',
    'Hmm... interessante! 🎀',
    'Você sempre tem coisas legais para falar! 🌸',
    'Estou aprendendo tanto com você! 📚',
    'Que divertido! Continue! 🎉',
    'Adorei sua mensagem! 💖'
  ];
  
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
};
