import db from './index';

export const bulkPost = async () => {
  try {
    await db.queryAsync(
      `
      INSERT INTO posts (id, title, description, condition, location, demand, user_id, watch_count, view_count, offer_count, status, main_photo) 
      VALUES
        (1, 'Superman', 'Man of Steel', 'New (never used)', 'Metropolis', 'Kryponite', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/superman/images/b/b1/Superman_Action_976_Gary_Frank.png/revision/latest/scale-to-width-down/288?cb=20170501140424'),
        (2, 'Batman', 'The Dark Knight', 'Open Box (never used)', 'Gotham', '$$$', 1, 0, 0, 0, 'Accepting Offers', 'https://www.planwallpaper.com/static/images/4058802-6025115082-31152.jpg'),
        (3, 'Spiderman', 'Friendly Neighborhood Spiderman', 'For Parts', 'Brooklyn', 'Web cartridges', 1, 0, 0, 0, 'Accepting Offers', 'http://i.annihil.us/u/prod/marvel/i/mg/2/00/53710b14a320b.png'),
        (4, 'Squirtle', 'squirtle squadddd', 'Reconditioned/Certified', 'Indigo', 'Water filter system', 2, 0, 0, 0, 'Accepting Offers', 'http://www.freepngimg.com/download/pokemon/11-2-pokemon-png.png'),
        (5, 'Charmander', 'charrrr', 'Reconditioned/Certified', 'Indigo', 'Lighter', 2, 0, 0, 0, 'Accepting Offers', 'http://bdfjade.com/data/out/126/6290093-imagenes-de-pokemon.png'),
        (6, 'Pikachu', 'pika pika', 'New (never used)', 'Indigo', 'Tesla Model 3', 2, 0, 0, 0, 'Accepting Offers', 'https://orig00.deviantart.net/4bd7/f/2017/099/2/1/main_qimg_76479dd91dc55c2768ddccfc30a4fbf5_by_mr_nooblette-db59lpi.png'),
        (7, 'Bulbasaur', 'bulbbbaaa', 'Reconditioned/Certified', 'Indigo', 'Vitamin D pills', 2, 0, 0, 0, 'Accepting Offers', 'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png'),
        (8, 'Finn the Human', 'yoooooo', 'Used (normal wear)', 'Land of Ooo', 'Brazilian BBQ', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/cf/Finn.png/revision/latest?cb=20121022153101'),
        (9, 'Jake the Dog', 'woof woof', 'Reconditioned/Certified', 'Land of Ooo', '24 pack of Bud Light', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20160503014517'),
        (10, 'BMO', 'beep boop beep', 'For Parts', 'Land of Ooo', 'Nintendo Switch', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/4/46/Bmo-0.png/revision/latest?cb=20150322022558'),
        (11, 'Ice King', 'burrrrr', 'New (never used)', 'Ice Kingdom', 'Fur Coat', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/64/Original_Ice_King.png/revision/latest?cb=20160405041324'),
        (12, 'Rick Sanchez', 'The Mad Scientist', 'Open Box (never used)', 'Seattle', 'Plutonium', 4, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/rickandmorty/images/d/dd/Rick.png/revision/latest?cb=20131230003659'),
        (13, 'Morty Smith', 'uhhhhhh', 'For Parts', 'Seattle', 'Popsicles', 4, 0, 0, 0, 'Accepting Offers', 'http://i.annihil.us/u/prod/marvel/i/mg/2/00/53710b14a320b.png'),
        (14, 'Jerry Smith', 'wuuttttttttt', 'Reconditioned/Certified', 'Seattle', 'iPhone X', 4, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/rickandmorty/images/f/f1/Jerry_Smith.png/revision/latest?cb=20160923151111'),
        (15, 'Kyle', 'sup dude', 'Reconditioned/Certified', 'South Park', 'The Karate Kid on VHS', 5, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/9/95/Kyle-broflovski.png/revision/latest?cb=20170725131924'),
        (16, 'Mysterion', '???', 'Used (normal wear)', 'South Park', 'Batmobile', 5, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/1/1c/Mysterion_2.png/revision/latest?cb=20171107042555'),
        (17, 'Cartman', 'Respek my Authoritay', 'Other (see description)', 'South Park', 'cheetos', 5, 0, 0, 0, 'Accepting Offers', 'https://tribzap2it.files.wordpress.com/2016/10/south-park-eric-cartman-11.jpg?w=1400'),
        (18, 'Butters', 'oh hamburgers', 'For Parts', 'South Park', 'Uggs', 5, 0, 0, 0, 'Accepting Offers', 'https://upload.wikimedia.org/wikipedia/en/0/06/ButtersStotch.png'),
        (19, 'Kenny', 'OMG THEY KILLED KENNY', 'Open Box (never used)', 'South Park', 'High School Musical DVD', 5, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/6/6f/KennyMcCormick.png/revision/latest?cb=20160409020502'),
        (20, 'Jimmy', 'm-m-m-m-my n-n-n-n-n-name i-i-s... j-j-jimmy', 'New (never used)', 'South Park', 'Beats by Dre', 5, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/6/63/Jimmy_valmer_here.png/revision/latest?cb=20170815180902')
      `
    );
    console.log('successfully add seed data');
  } catch (err) {
    console.log('error adding seed data', err);
  }
};
