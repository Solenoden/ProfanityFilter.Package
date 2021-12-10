import { MaskMode } from '../../enums/mask-mode.enum'

export class ProfanityFilter {
    private readonly defaultGrawlixCharacters = ['@', '#', '*', '&', '$', '%']
    public grawlixCharacters: string[]

    constructor(
        public blacklist: string[],
        public maskMode: MaskMode = MaskMode.Asterisk,
        grawlixCharacters?: string[]
    ) {
        this.grawlixCharacters = grawlixCharacters ? grawlixCharacters : this.defaultGrawlixCharacters
    }

    public maskProfanity(text: string): string {
        this.blacklist.forEach(blacklistedWord => {
            const regex = new RegExp(blacklistedWord, 'gmi')
            if (regex.test(text)) {
                const maskedWord = this.maskWord(blacklistedWord)
                text = text.replace(regex, maskedWord)
            }
        })

        return text
    }

    public maskWord(word: string): string {
        let maskedWord = ''
        for (const letter of word) {
            if (letter === ' ') {
                maskedWord += ' '
                continue
            }

            if (this.maskMode === MaskMode.Asterisk) {
                maskedWord += '*'
            } else {
                const randomGrawlixCharacter = this.grawlixCharacters[Math.floor(Math.random() * this.grawlixCharacters.length)]
                maskedWord += randomGrawlixCharacter
            }
        }

        return maskedWord
    }

    public scanForProfanity(text: string): { containsProfanity: boolean, profaneWord: string } {
        let regexBlacklist = this.blacklist.reduce((runningValue, currentValue) => runningValue + currentValue + '|', '')
        regexBlacklist = regexBlacklist.slice(0, regexBlacklist.length - 1)
        const profaneWord = new RegExp(regexBlacklist, 'gmi').exec(text)

        return {
            containsProfanity: !!profaneWord,
            profaneWord: profaneWord ? profaneWord[0] : ''
        }
    }
}
