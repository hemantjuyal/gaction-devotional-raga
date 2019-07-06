const name = 'Devotional Raga';

const introPrompt = 'Here is todays re-mastered raga';

const data = [{
    id: 1,
    title: "Om Mantra",
    description: "Om mantra remastered version",
    album: "Devotional Raga",
    url: "https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra.mp3",
    image: "https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png"
  },
  {
    id: 2,
    title: "Buddha Om Mantra",
    description: "Buddha om mantra remastered version",
    album: "Devotional Raga",
    url: "https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_buddha.mp3",
    image: "https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png"
  },
  {
    id: 3,
    title: "Ganesha Om Mantra",
    description: "Ganesha om mantra remastered version",
    album: "Devotional Raga",
    url: "https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_ganesha.mp3",
    image: "https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png"
  },
  {
    id: 4,
    title: "Narayana Om Mantra",
    description: "Narayana om mantra remastered version",
    album: "Devotional Raga",
    url: "https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_narayana.mp3",
    image: "https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png"
  },
  {
    id: 5,
    title: "Sai Om Mantra",
    description: "Sai om mantra remastered version",
    album: "Devotional Raga",
    url: "https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_sai.mp3",
    image: "https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png"
  },
  {
    id: 6,
    title: "Durga Om Mantra",
    description: "Durga om mantra remastered version",
    album: "Devotional Raga",
    url: "https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_durga.mp3",
    image: "https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png"
  },
  {
    id: 7,
    title: 'Gayatri Om Mantra',
    description: 'Gayatri om mantra remastered version',
    image: 'https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png',
    url: 'https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_gayatri.mp3'
  }, {
    id: 8,
    title: 'Shiv Om Mantra',
    description: 'Shiv mantra remastered version',
    image: 'https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png',
    url: 'https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_shiv.mp3'
  }, {
    id: 9,
    title: 'Krishna Om Mantra',
    description: 'Krishna om mantra remastered version',
    image: 'https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png',
    url: 'https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_krishna.mp3'
  }, {
    id: 10,
    title: 'Buddha Tibetan Om Mantra',
    description: 'Buddha tibetan om mantra remastered version',
    image: 'https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png',
    url: 'https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_tibetan_buddha.mp3'
  },
  {
    id: 11,
    title: 'Om Mantra Remix',
    description: 'Om mantra remastered remix version',
    image: 'https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png',
    url: 'https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_remix.mp3'
  },
  {
    id: 12,
    title: 'Ganesha Om Mantra Remix',
    description: 'Ganesha om mantra remastered remix version',
    image: 'https://smartassistants.s3-eu-west-1.amazonaws.com/images/logo/devotion_raga_logo.png',
    url: 'https://smartassistants.s3-eu-west-1.amazonaws.com/media/audio/devotional_raga/om_mantra_ganesha_remix.mp3'
  }
];


// Configuration to let the player keep playing tracks:
const supportsMore = true;

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
// https://github.com/actions-on-google/actions-on-google-nodejs
const {
  dialogflow,
  Suggestions,
  MediaObject,
  Image
} = require('actions-on-google');
// Import the firebase-functions package for Cloud Functions for Firebase fulfillment.
const functions = require('firebase-functions');
// Node util module used for creating dynamic strings
const util = require('util');

// Instantiate the Dialogflow client with debug logging enabled.
const app = dialogflow({
  debug: true
});

// Do common tasks for each intent invocation
app.middleware((conv, framework) => {
  console.log(`Intent=${conv.intent}`);
  console.log(`Type=${conv.input.type}`);
  // Determine if the user input is by voice
  conv.voice = conv.input.type === 'VOICE';
  if (!(conv.intent === 'Default Fallback Intent' || conv.intent === 'No-input')) {
    // Reset the fallback counter for error handling
    conv.data.fallbackCount = 0;
  }
});

// Prompts used for responding to the user.
// Each prompt type can have multiple alternatives. A prompt is selected
// randomly to make the conversation more natural.
const prompts = {
  'welcome': [
    `Welcome to ${name}.`,
    `Hi! It's time for ${name}.`
  ],
  'welcome_back': [
    `Welcome back to ${name}.`,
    `Hi again. Welcome back to ${name}.`
  ],
  'intro': [
    'Here we go.',
    `Let's get started.`
  ],
  'confirmation': [
    'Sure.',
    'OK.',
    'Okay.',
    'Sure thing.',
    'Alright.'
  ],
  'quit': [
    'Bye for now. Hope to see you soon.',
    'OK. Come back soon.',
    `Okay, let's try this again later.`,
    'OK. Hope to talk to you again soon.'
  ],
  'no_input1': [
    'Sorry, what was that?',
    `Sorry, I didn't hear that.`,
    `If you said something, I didn't hear it.`
  ],
  'no_input2': [
    `Sorry, I didn't catch that. Could you repeat yourself?`,
    `If you're still there, say that again.`
  ],
  'no_input3': [
    `Okay let's try this again later.`,
    'We can stop here. See you soon.'
  ],
  'fallback1': [
    `I didn't quite get that. What do you want to do?`,
    `I didn't understand that. What do you want to do?`
  ],
  'fallback2': [
    `Hmmm. Since I'm still having trouble, I'll stop here. Let's play again soon.`,
    `Since I'm still having trouble, I'll stop here. Try again in a few minutes.`,
    `Since I'm still having trouble, I'll stop here. Bye for now.`
  ],
  'help': [
    'You can ask to repeat the last track, go to the next track, or quit. What do you want to do?',
    'You can ask for the track to be repeated or you can ask for the next track. What do you want to do now?'
  ],
  'repeat': [
    'Here it is again: ',
    'Let me repeat that: '
  ],
  'error': [
    'Oops! Something went wrong. Please try again later.'
  ],
  'end': [
    'Hope to see you soon.',
    'Come back soon.',
    `Let's try this again later.`,
    'Hope to talk to you again soon.'
  ],
  'next': [
    `Next up: '%s' by '%s' from the album '%s'.`
  ]
};

// Overwrite the default intro prompts with configured prompts above.
if (introPrompt) {
  if (Array.isArray(introPrompt)) {
    prompts.intro = introPrompt;
  } else {
    prompts.intro = [introPrompt];
  }
}

// Suggestion chips to let the user pick options on screens
// https://developers.google.com/actions/assistant/responses#suggestion_chip
const suggestions1 = new Suggestions('Next', 'Exit');
const suggestions2 = new Suggestions('Next', 'Previous', 'Exit');
const suggestions3 = new Suggestions('Exit');

// Utility to get a random item from an array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * (array.length))];
};

// Utility to get a random prompt without sequential repeats
const getRandomPrompt = (conv, prompt) => {
  let availablePrompts = prompts[prompt];
  // Select a new prompt by avoiding prompts used previously in the session
  if (conv.data.prompts) {
    if (typeof(conv.data.prompts[prompt]) !== 'undefined') {
      availablePrompts = availablePrompts.filter(word => word !== conv.data.prompts[prompt]);
    }
  } else {
    conv.data.prompts = {};
  }
  // Persist selected prompt in session storage
  if (availablePrompts.length > 0) {
    conv.data.prompts[prompt] = getRandomItem(availablePrompts);
  } else {
    conv.data.prompts[prompt] = prompts[prompt][0];
  }
  return conv.data.prompts[prompt];
};

// Select the next track to play from the data
const nextTrack = (conv, intro, backwards) => {
  console.log(`nextTrack: ${conv.user.storage.track}`);
  let track = data[0];
  // Persist the selected track in user storage
  // https://developers.google.com/actions/assistant/save-data#save_data_across_conversations
  if (conv.user.storage.track) {
    conv.user.storage.track = parseInt(conv.user.storage.track, 10);
    if (backwards) {
      conv.user.storage.track--;
    } else {
      conv.user.storage.track++;
    }
    if (conv.user.storage.track === 0) {
      conv.user.storage.track = data.length;
    } else if (conv.user.storage.track > data.length) {
      // Loop the tracks
      conv.user.storage.track = 1;
    }
    track = data[conv.user.storage.track - 1];
  } else {
    conv.user.storage.track = 1;
  }
  // Add a prompt intro
  if (!intro) {
    const nextPrompt = util.format(getRandomPrompt(conv, 'next'), track.title, track.description, track.album);
    if (conv.voice) {
      conv.ask(`<speak><prosody volume="silent">${nextPrompt}</prosody></speak>`);
    } else {
      conv.ask(nextPrompt);
    }
  }
  // Create a media response
  // https://developers.google.com/actions/assistant/responses#media_responses
  conv.ask(new MediaObject({
    name: track.title,
    url: track.url,
    description: track.description,
    icon: new Image({
      url: track.image,
      alt: 'Media icon'
    })
  }));
  // Add suggestions to continue the conversation
  if (supportsMore) {
    // Set the context to allow matching agent intents
    conv.contexts.set('more', 5);
    conv.ask(conv.user.storage.track === 1 ? suggestions1 : suggestions2);
  } else {
    conv.ask(suggestions3);
  }
};

// Default intent for handling the start of the action
app.intent('Default Welcome Intent', (conv) => {
  console.log(`Default Welcome: ${conv.user.last.seen}`);
  // Check if the device supports media playback
  if (!conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
    conv.close('Sorry, this device does not support audio playback.');
    return;
  }
  conv.ask(conv.user.last.seen ? getRandomItem(prompts.welcome_back) : getRandomItem(prompts.welcome));
  conv.ask(getRandomPrompt(conv, 'intro'));
  nextTrack(conv, true);
});


app.intent('Direct Welcome Intent', (conv) => {
  console.log(`Direct Welcome: ${conv.user.last.seen}`);
  // Check if the device supports media playback
  if (!conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
    conv.close('Sorry, this device does not support audio playback.');
    return;
  }
  conv.ask(conv.user.last.seen ? getRandomItem(prompts.welcome_back) : getRandomItem(prompts.welcome));
  conv.ask(getRandomPrompt(conv, 'intro'));
  nextTrack(conv, true);
});

// Fallback intent to handle user responses that aren't handled by other intents
app.intent('Default Fallback Intent', (conv) => {
  console.log(`Fallback: fallbackCount=${conv.data.fallbackCount}`);
  console.log(`Fallback: raw=${conv.input.raw}`);
  // Track the fallback count in session storage
  conv.data.fallbackCount = parseInt(conv.data.fallbackCount, 10);
  conv.data.fallbackCount++;
  // Try to recover the conversation twice before ending the action
  if (conv.data.fallbackCount === 1) {
    return conv.ask(getRandomPrompt(conv, 'fallback1'));
  }
  conv.close(getRandomPrompt(conv, 'fallback2'));
});

// Handle the More/Yes/Next intents
app.intent(['More', 'Yes', 'Next'], (conv) => {
  console.log(`More: fallbackCount=${conv.data.fallbackCount}`);
  nextTrack(conv, false);
});

// Handle the Repeat/Previous intent
app.intent(['Repeat', 'Previous'], (conv) => {
  console.log(`Repeat: ${conv.user.storage.track}`);
  nextTrack(conv, false, true);
});

// Handle the No/Cancel/Don't know intents by closing the conversation
app.intent(['No', 'Cancel', `Don't know`], (conv) => {
  conv.close(getRandomPrompt(conv, 'quit'));
});

// Handle the Help intent
app.intent('Help', (conv) => {
  conv.ask(`${getRandomPrompt(conv, 'help')}`);
});

// Handle no-inputs from the user
// https://developers.google.com/actions/assistant/reprompts
app.intent('No-input', (conv) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  console.log(`No-input: repromptCount=${repromptCount}`);
  if (repromptCount === 0) {
    conv.ask(getRandomPrompt(conv, 'no_input1'));
  } else if (repromptCount === 1) {
    conv.ask(getRandomPrompt(conv, 'no_input2'));
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
    // Last no-input allowed; close conversation
    conv.close(getRandomPrompt(conv, 'no_input3'));
  }
});

// Handling callback after media playback completion
// https://developers.google.com/actions/assistant/responses#media_responses
app.intent('Media Status', (conv) => {
  const mediaStatus = conv.arguments.get('MEDIA_STATUS');
  if (mediaStatus && mediaStatus.status === 'FINISHED') {
    console.log(`track finished: ${conv.user.storage.track}`);
    if (supportsMore) {
      // Automatically start playing the next track
      nextTrack(conv, false);
    } else {
      conv.close(getRandomPrompt(conv, 'end'));
    }
  } else {
    console.log('Unknown media status received.');
    conv.close(getRandomPrompt(conv, 'error'));
  }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);