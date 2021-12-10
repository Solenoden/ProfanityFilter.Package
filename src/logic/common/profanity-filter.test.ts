import { beforeEach, describe, expect, it } from '@jest/globals'
import { ProfanityFilter } from './profanity-filter'
import { MaskMode } from '../../enums/mask-mode.enum'

describe('test ProfanityFilter', () => {
    let profanityFilter: ProfanityFilter

    beforeEach(() => {
        profanityFilter = new ProfanityFilter([
            'foos',
            'bar'
        ])
    })

    it('should set the grawlix characters if provided', () => {
        void expect(
            new ProfanityFilter(['bar'], MaskMode.Grawlix, ['a', 'b']).grawlixCharacters
        ).toEqual(['a', 'b'])

        void expect(
            new ProfanityFilter(['bar']).grawlixCharacters
        ).toEqual(new ProfanityFilter(['bar'])['defaultGrawlixCharacters'])
    })

    describe('test maskProfanity', () => {
        it('it should mask all words in the provided text that are blacklisted', () => {
            const maskedText = profanityFilter.maskProfanity('Hey, check this bar, what a foos.')
            const expectedMaskedText = 'Hey, check this ***, what a ****.'

            void expect(maskedText).toEqual(expectedMaskedText)
        })
    })

    describe('test maskWord', () => {
        it('should mask the word with asterisks if the mask mode is set to asterisk', () => {
            profanityFilter.maskMode = MaskMode.Asterisk

            let maskedWord = profanityFilter.maskWord('Hello')
            void expect(maskedWord).toEqual('*****')

            maskedWord = profanityFilter.maskWord('Hello world.')
            void expect(maskedWord).toEqual('***** ******')
        })

        it('should mask the word with random grawlix characters if the mask mode is set to grawlix', () => {
            profanityFilter.maskMode = MaskMode.Grawlix
            profanityFilter.grawlixCharacters = ['@', '#', '!']

            let maskedWord = profanityFilter.maskWord('Hello').replace(/[@#!]/g, 'X')
            void expect(maskedWord).toEqual('XXXXX')

            maskedWord = profanityFilter.maskWord('Hello world').replace(/[@#!]/g, 'X')
            void expect(maskedWord).toEqual('XXXXX XXXXX')
        })
    })

    describe('test scanForProfanity', () => {
        it('should return the containsProfanity flag', () => {
            const scanResult1 = profanityFilter.scanForProfanity('Hello foos, how is bar today?')
            void expect(scanResult1.containsProfanity).toBeTruthy()

            const scanResult2 = profanityFilter.scanForProfanity('Hello, how is it going today?')
            void expect(scanResult2.containsProfanity).toBeFalsy()
        })

        it('should return the first profane word in the text', () => {
            const scanResult1 = profanityFilter.scanForProfanity('Hello foos, how is bar today?')
            void expect(scanResult1.profaneWord).toEqual('foos')

            const scanResult2 = profanityFilter.scanForProfanity('Hello, how is it going today?')
            void expect(scanResult2.profaneWord).toEqual('')
        })
    })
})
