import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';

const FILE_PATH = './changes.json';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const argv = process.argv.slice(2);

const baseDate = new Date(argv);

const firstDay = baseDate;
const secondDay = addDays(firstDay, 1);
const thirdDay = addDays(secondDay, 5);
const forthDay = addDays(thirdDay, 3);
const fifthDay = addDays(forthDay, 5);
const sixthDay = addDays(fifthDay, 3);
const seventhDay = addDays(sixthDay, 3);
const eighthDay = addDays(seventhDay, 3);
const ninthDay = addDays(eighthDay, 5);
const tenthDay = addDays(ninthDay, 1);

const dates = [
  firstDay,
  secondDay,
  thirdDay,
  forthDay,
  fifthDay,
  sixthDay,
  seventhDay,
  eighthDay,
  ninthDay,
  tenthDay,
];

for await (const _ of [1, 2, 3]) {
  for await (let date of dates) {
    const stringDate = date.toString();

    const data = { date: stringDate };

    await jsonfile.writeFileSync(FILE_PATH, data);

    await simpleGit()
      .add([FILE_PATH])
      .commit(stringDate, { '--date': stringDate })
      .push();

    console.log('Date finished: ', stringDate);
  }
}

console.log('FINISHED <3');
