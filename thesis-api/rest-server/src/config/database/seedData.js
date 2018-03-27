import db from './index';

export const bulkPost = async () => {
  try {
    await db.queryAsync(
      `
      INSERT INTO posts (title, description, condition, location, demand, user_id, watch_count, view_count, offer_count, status, main_photo) 
      VALUES
        ('Superman', 'Man of Steel', 'New (never used)', 'Metropolis', 'Anything but Kryptonite', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/superman/images/b/b1/Superman_Action_976_Gary_Frank.png/revision/latest/scale-to-width-down/288?cb=20170501140424'),
        ('Batman', 'The Dark Knight', 'Open Box (never used)', 'Gotham', 'Kryptonite', 1, 0, 0, 0, 'Accepting Offers', 'https://www.planwallpaper.com/static/images/4058802-6025115082-31152.jpg'),
        ('Spiderman', 'Friendly Neighborhood Spiderman', 'For Parts', 'Brooklyn', 'Laker tickets', 1, 0, 0, 0, 'Accepting Offers', 'http://i.annihil.us/u/prod/marvel/i/mg/2/00/53710b14a320b.png'),
        ('Squirtle', 'squirtle squadddd', 'Reconditioned/Certified', 'Pallet Town', 'Supreme Fanny Pack', 2, 0, 0, 0, 'Accepting Offers', 'http://www.freepngimg.com/download/pokemon/11-2-pokemon-png.png'),
        ('Charmander', 'charrrr', 'Reconditioned/Certified', 'Pallet Town', 'Adidas Ultra Boost', 2, 0, 0, 0, 'Accepting Offers', 'http://bdfjade.com/data/out/126/6290093-imagenes-de-pokemon.png'),
        ('Pikachu', 'pika pika', 'New (never used)', 'Pallet Town', 'Tesla Model 3', 2, 0, 0, 0, 'Accepting Offers', 'https://orig00.deviantart.net/4bd7/f/2017/099/2/1/main_qimg_76479dd91dc55c2768ddccfc30a4fbf5_by_mr_nooblette-db59lpi.png'),
        ('Bulbasaur', 'bulbbbaaasauurrr', 'Reconditioned/Certified', 'Pallet Town', 'Vitamin D pills', 2, 0, 0, 0, 'Accepting Offers', 'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png'),
        ('Finn the Human', 'yoooooo wdup dawg', 'Used (normal wear)', 'Land of Ooo', 'MacBook Pro', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/cf/Finn.png/revision/latest?cb=20121022153101'),
        ('Jake the Dog', 'woof woof', 'Reconditioned/Certified', 'Land of Ooo', '24 pack of Bud Light', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20160503014517'),
        ('BMO', 'beep boop beep', 'For Parts', 'Land of Ooo', 'Nintendo Switch', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/4/46/Bmo-0.png/revision/latest?cb=20150322022558'),
        ('Ice King', 'burrrrr', 'New (never used)', 'Ice Kingdom', 'Fur Coat', 3, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/64/Original_Ice_King.png/revision/latest?cb=20160405041324'),
        ('Rick Sanchez', 'The Mad Scientist', 'Open Box (never used)', 'Seattle', 'Plutonium', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/rickandmorty/images/d/dd/Rick.png/revision/latest?cb=20131230003659'),
        ('Morty Smith', 'uhhhhhh', 'For Parts', 'Seattle', 'PlayStation 4', 1, 0, 0, 0, 'Accepting Offers', 'https://pbs.twimg.com/profile_images/693986726058917888/piI-BFuY_400x400.jpg'),
        ('Jerry Smith', 'wuuttttttttt', 'Reconditioned/Certified', 'Seattle', 'iPhone X', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/rickandmorty/images/f/f1/Jerry_Smith.png/revision/latest?cb=20160923151111'),
        ('Kyle', 'sup dude', 'Reconditioned/Certified', 'South Park', 'The Karate Kid on VHS', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/9/95/Kyle-broflovski.png/revision/latest?cb=20170725131924'),
        ('Mysterion', '??? u w0t m8', 'Used (normal wear)', 'South Park', 'Batmobile', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/1/1c/Mysterion_2.png/revision/latest?cb=20171107042555'),
        ('Cartman', 'Respek my Authority', 'Other (see description)', 'South Park', 'Cheetos', 1, 0, 0, 0, 'Accepting Offers', 'https://tribzap2it.files.wordpress.com/2016/10/south-park-eric-cartman-11.jpg?w=1400'),
        ('Butters', 'oh hamburgers!', 'For Parts', 'South Park', 'Ugg boots', 1, 0, 0, 0, 'Accepting Offers', 'https://upload.wikimedia.org/wikipedia/en/0/06/ButtersStotch.png'),
        ('Kenny', 'OMG THEY KILLED KENNY', 'Open Box (never used)', 'South Park', 'High School Musical DVD', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/6/6f/KennyMcCormick.png/revision/latest?cb=20160409020502'),
        ('Jimmy', 'm-m-my n-n-n-name i-i-s... j-j-jimmy!', 'New (never used)', 'South Park', 'Beats by Dre', 1, 0, 0, 0, 'Accepting Offers', 'https://vignette.wikia.nocookie.net/southpark/images/6/63/Jimmy_valmer_here.png/revision/latest?cb=20170815180902')
      `
    );
    console.log('successfully add seed data');
  } catch (err) {
    console.log('error adding seed data', err);
  }
};
