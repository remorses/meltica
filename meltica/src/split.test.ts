import { splitTextInParts } from 'meltica/src/split'
import { describe, test, expect } from 'vitest'

let longText = `
Ladies and gentlemen, Today, I stand before you to address the critical issue of corruption and transparency in the context of Brazilian policies. Corruption has long been a deeply rooted problem worldwide, eroding public trust, hampering economic development, and undermining democratic institutions. Brazil, as a vibrant democracy and one of the world's largest economies, has faced significant challenges in combating corruption. However, it is important to acknowledge the substantial efforts and progress made by the country in recent years to address this issue and foster transparency. Brazil has implemented several key policies and initiatives to tackle corruption and promote transparency. One such initiative is the enactment of the Clean Company Act in 2014. This legislation established stricter liability for companies engaged in corrupt practices, imposing hefty penalties and providing the government with enhanced tools to investigate and prosecute offenders. 
acknowledge acknowledge acknowledge acknowledge acknowledge x acknowledge acknowledge acknowledge acknowledge dsf acknowledge acknowledge acknowledge hdf acknowledge acknowledge acknowledge acknowledge acknowledge sdsfaasdd acknowledge acknowledge acknowledge ccsddf acknowledge acknowledge ttt acknowledge acknowledge
`
describe('splitTextInParts', () => {
    test('dots are kept', () => {
        // 30 * 5 = 150
        expect(
            splitTextInParts({
                items: `This is how you today.
You go to this website and click the button to become a seller!`.split(' ').map(word => word + ' '),
                getText: (item) => item,
                maxLen: 30,
            }).map((part) => part.join('')),
        ).toMatchInlineSnapshot(`
          [
            "This is how you today.
          You ",
            "go to this website and click ",
            "the button to become a seller! ",
          ]
        `)
    })
    test('long with dots every 30 chars', () => {
        let phrase = `long with dots every 100 chars` // 30 chars
        // 30 * 5 = 150
        expect(
            splitTextInParts({
                items: `${phrase}. ${phrase}. ${phrase}. ${phrase}. ${phrase}. `.split(
                    ' ',
                ).map(word => word + ' '),
                getText: (item) => item,
                maxLen: 40,
            }).map((part) => part.join('')),
        ).toMatchInlineSnapshot(`
          [
            "long with dots every 100 chars. ",
            "long with dots every 100 chars. ",
            "long with dots every 100 chars. ",
            "long with dots every 100 chars. ",
            "long with dots every 100 chars.  ",
          ]
        `)
    })
    test('long with dots and commas every 30 chars', () => {
        let phrase = `long with dots every 100 chars` // 30 chars
        // 30 * 5 = 150
        expect(
            splitTextInParts({
                items: `${phrase}. ${phrase}, ${phrase}, ${phrase} ${phrase}. `.split(
                    ' ',
                ).map(word => word + ' '),
                getText: (item) => item,
                maxLen: 40,
            }).map((part) => part.join('')),
        ).toMatchInlineSnapshot(`
          [
            "long with dots every 100 chars. ",
            "long with dots every 100 chars, ",
            "long with dots every 100 chars, ",
            "long with dots every 100 chars long ",
            "with dots every 100 chars.  ",
          ]
        `)
    })
    test('long with dots 40 chars', () => {
        let phrase = `long with dots every 100 chars xxxxxxxxx`
        // 30 * 5 = 150
        expect(
            splitTextInParts({
                items: `${phrase}. ${phrase}, ${phrase}, ${phrase} ${phrase}. `.split(
                    ' ',
                ).map(word => word + ' '),
                getText: (item) => item,
                maxLen: 40,
            }).map((part) => part.join('')),
        ).toMatchInlineSnapshot(`
          [
            "long with dots every 100 chars ",
            "xxxxxxxxx. ",
            "long with dots every 100 chars ",
            "xxxxxxxxx, ",
            "long with dots every 100 chars ",
            "xxxxxxxxx, ",
            "long with dots every 100 chars ",
            "xxxxxxxxx long with dots every 100 ",
            "chars xxxxxxxxx.  ",
          ]
        `)
    })
    test('dots every 14 chars are merged', () => {
        let phrase = `long with dots` //
        // 30 * 5 = 150
        expect(
            splitTextInParts({
                items: `${phrase}. ${phrase}. ${phrase}. ${phrase}. ${phrase}. `.split(
                    ' ',
                ).map(word => word + ' '),
                getText: (item) => item,
                maxLen: 40,
            }).map((part) => part.join('')),
        ).toMatchInlineSnapshot(`
          [
            "long with dots. long with dots. ",
            "long with dots. long with dots. ",
            "long with dots.  ",
          ]
        `)
    })
    test('real use case text', () => {
        let phrase = `This is how you can make $5,580 using artificial intelligence today!
        You go to Fiverr and click this button to become a seller!
        You create a service to say that you will write beauty articles.
        You go to THIS secret website and click THIS purple button to sign up!
        You search for the "Beauty Article Writer" prompt!
        You follow the 3 steps on how to use the prompt to make money!
        You sit back and watch artificial intelligence do all the work for you in less than 1 minute!
        This is Daniella!
        She charges $45 to write a beauty article and already has 124 reviews!
        Which means she has made over five thousand five hundred and eighty dollars writing beauty articles!  And so can you!
        You just go to THIS secret website and click the purple button to sign up.  And you can start getting paid right away!`
        // 30 * 5 = 150
        let parts = splitTextInParts({
            items: phrase.split(' ').map(word => word + ' '),
            getText: (item) => item,
            maxLen: 300,
        })
        for (let part of parts) {
            const joinedPart = part.join('')
            expect(joinedPart.length, joinedPart).toBeLessThanOrEqual(300)
        }
        expect(parts.map((part) => part.join(''))).toMatchInlineSnapshot(`
          [
            "This is how you can make $5,580 using artificial intelligence today!
                  You go to Fiverr and click this button to become a seller!
                  You create a service to say that you will write beauty articles.
                  You go to THIS secret website and click THIS purple button to sign up!
           ",
            "       You search for the "Beauty Article Writer" prompt!
                  You follow the 3 steps on how to use the prompt to make money!
                  You sit back and watch artificial intelligence do all the work for you in less than 1 minute!
                  This is Daniella!
           ",
            "       She charges $45 to write a beauty article and already has 124 reviews!
                  Which means she has made over five thousand five hundred and eighty dollars writing beauty articles!  And so can you!
           ",
            "       You just go to THIS secret website and click the purple button to sign up.  And you can start getting paid right away! ",
          ]
        `)
    })
    test('real use case text 2', () => {
        // 30 * 5 = 150
        let parts = splitTextInParts({
            items: longText.split(' ').map(word => word + ' '),
            getText: (item) => item,
            maxLen: 46,
        })
        for (let part of parts) {
            const joinedPart = part.join('')
            expect(joinedPart.length, `${joinedPart}`).toBeLessThanOrEqual(300)
        }
        expect(parts.map((part) => part.join(''))).toMatchInlineSnapshot(`
          [
            "
          Ladies and gentlemen, Today, ",
            "I stand before you to address the critical ",
            "issue of corruption and transparency in the ",
            "context of Brazilian policies. ",
            "Corruption has long been a deeply rooted ",
            "problem worldwide, eroding public trust, ",
            "hampering economic development, ",
            "and undermining democratic institutions. ",
            "Brazil, ",
            "as a vibrant democracy and one of the world's ",
            "largest economies, ",
            "has faced significant challenges in combating ",
            "corruption. ",
            "However, ",
            "it is important to acknowledge the ",
            "substantial efforts and progress made by the ",
            "country in recent years to address this issue ",
            "and foster transparency. ",
            "Brazil has implemented several key policies ",
            "and initiatives to tackle corruption and ",
            "promote transparency. ",
            "One such initiative is the enactment of the ",
            "Clean Company Act in 2014. ",
            "This legislation established stricter ",
            "liability for companies engaged in corrupt ",
            "practices, ",
            "imposing hefty penalties and providing the ",
            "government with enhanced tools to investigate ",
            "and prosecute offenders. ",
            "
          acknowledge acknowledge acknowledge ",
            "acknowledge acknowledge x acknowledge ",
            "acknowledge acknowledge acknowledge dsf ",
            "acknowledge acknowledge acknowledge hdf ",
            "acknowledge acknowledge acknowledge ",
            "acknowledge acknowledge sdsfaasdd acknowledge ",
            "acknowledge acknowledge ccsddf acknowledge ",
            "acknowledge ttt acknowledge acknowledge
           ",
          ]
        `)
    })
    test('real use case text 3', () => {
        let original = `Structured as a web3 inspired ecoe system for distinct digital assets. We are creating a platform to revive and reconnect with an art form that has always been with us, but has been obscured from our sights. We want to awaken senses, stir emotions and illuminate the human experience. Join our exclusive community and marketplace to become a valued member of an elite group, That is revaluating the human experience through a true value proposition! Visit Artist.com`
        let parts = splitTextInParts({
            items: original.split(' ').map(word => word + ' '),
            getText: (item) => item,
            maxLen: 300,
        })
        for (let part of parts) {
            const joinedPart = part.join('')
            expect(joinedPart.length, `${joinedPart}`).toBeLessThanOrEqual(300)
        }
        const together = parts.map((part) => part.join('')).join('')
        expect(together.trim()).toBe(original)
        // expect(together).toBe(original)
        expect(parts.map((part) => part.join(''))).toMatchInlineSnapshot(`
          [
            "Structured as a web3 inspired ecoe system for distinct digital assets. We are creating a platform to revive and reconnect with an art form that has always been with us, but has been obscured from our sights. We want to awaken senses, stir emotions and illuminate the human experience. ",
            "Join our exclusive community and marketplace to become a valued member of an elite group, That is revaluating the human experience through a true value proposition! Visit Artist.com ",
          ]
        `)
    })
})
