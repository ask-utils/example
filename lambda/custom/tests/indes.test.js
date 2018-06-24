const { DefaultHandlerAdapter, ResponseFactory } = require('ask-sdk-core')
const { getHandlerInput } = require('ask-utils')
const assert = require('power-assert')
const handlers = require('../index')
const event = {
  session: {
    new: true,
    sessionId: 'amzn1.echo-api.session.[unique-value-here]',
    attributes: {},
    user: {
      userId: 'amzn1.ask.account.[unique-value-here]'
    },
    application: {
      applicationId: 'amzn1.ask.skill.[unique-value-here]'
    }
  },
  version: '1.0',
  request: {
    locale: 'en-US',
    timestamp: '2016-10-27T18:21:44Z',
    type: 'AMAZON.HelpIntent',
    requestId: 'amzn1.echo-api.request.[unique-value-here]'
  },
  context: {
    AudioPlayer: {
      playerActivity: 'IDLE'
    },
    System: {
      device: {
        supportedInterfaces: {
          AudioPlayer: {}
        }
      },
      application: {
        applicationId: 'amzn1.ask.skill.[unique-value-here]'
      },
      user: {
        userId: 'amzn1.ask.account.[unique-value-here]'
      }
    }
  }
}
const handlerAdapter = new DefaultHandlerAdapter()

describe('LaunchRequestHandler', () => {
  it('should speach valid response', async() => {
    event.request.type = 'LaunchRequest'
    const handlerInput = getHandlerInput(event)
    const { LaunchRequestHandler } = handlers
    const response = await handlerAdapter.execute(handlerInput, LaunchRequestHandler)
    assert.equal(response.outputSpeech.ssml, "<speak>Welcome to the Alexa Skills Kit, you can say hello!</speak>")
    assert.equal(response.shouldEndSession, false)
  })
})
describe('HelloWorldIntentHandler', () => {
  it('should speach valid response', async() => {
    event.request.type = 'IntentRequest'
    event.request.intent = {
      name:'HelloWorldIntent'
    }
    const handlerInput = getHandlerInput(event)
    const { HelloWorldIntentHandler } = handlers
    const response = await handlerAdapter.execute(handlerInput, HelloWorldIntentHandler)
    assert.equal(response.outputSpeech.ssml, "<speak>Hello World!</speak>")
  })
})
