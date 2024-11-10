import game from "./game.json";
import global from "./global.json";
// MARK Spread if you want to acces keys directly.
// MARK if you use same keys in multiple files last one will override
// MARK or add as lang:lang then access with $t('lang.key')

export default {
  ...global, // $t('key')
  game, // $t('game.key'),
  //game: game, // $t('game.key')
  //game, // $t('game.key')
};
