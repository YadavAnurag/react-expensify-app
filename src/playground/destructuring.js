const book = {
  title: 'Ego is the enemy',
  author: 'Anurag',
  publisher: {
    name: 'luna & company'
  }
};

const { name: publisherName = 'Anonymous' } = book.publisher;
console.log(publisherName);

const item = ['Coffee (hot)', '$2.0', '$2.5', '$33.0'];
const [coffee='Cappuccino', ,mediumPrice='$5.0'] = item; 
console.log(`A medium ${coffee} costs ${mediumPrice}`);