//
// sample.slide.js
// http://andantesoftware.com/eggnog/
// Distributed under the MIT License
//

var slide = (function(){
    var slide = {
        title: 'About the Eggnog',
        aspect: 4/3
    };
    
    slide.pages = [{
        note: '',
        blocks: [{
            elements: [{
                type: 'title',
                value: 'About the Eggnog',
                style: {
                    top: '40%',
                    width: '100%',
                    fontSize: '100%',
                    textAlign: 'center'
                }
            }]
        }]
    },{
        note: '',
        blocks: [{
            elements: [{
                type: 'text',
                value: 'What is it?',
                style: {
                    top: '40%',
                    width: '100%',
                    fontSize: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }
            }]
        }]
    },{
        note: '',
        blocks: [{
            elements: [{
                type: 'title',
                value: 'The Eggnog is ...',
                style: {
                    top: '2%',
                    width: '100%',
                    height: '18%',
                    fontSize: '100%',
                    textAlign: 'left'
                }
            }]
        },{
            elements: [{
                type: 'text',
                value: 'A presentation program',
                style: {
                    top: '22%',
                    left: '10%',
                    width: '80%',
                    height: '10%',
                    fontSize: '80%',
                    textAlign: 'left',
                    fontWeight: 'bold'
                }
            }]
        },{
            elements: [{
                type: 'text',
                value: 'on JavaScript, HTML',
                style: {
                    top: '36%',
                    left: '10%',
                    width: '80%',
                    height: '10%',
                    fontSize: '80%',
                    textAlign: 'left',
                    fontWeight: 'bold'
                }
            }]
        },{
            elements: [{
                type: 'text',
                value: 'Open Source Software',
                style: {
                    top: '50%',
                    left: '10%',
                    width: '80%',
                    height: '16%',
                    fontSize: '80%',
                    textAlign: 'left',
                    fontWeight: 'bold'
                }
            }]
        },{
            elements: [{
                type: 'text',
                value: 'Distributed under the MIT License',
                style: {
                    top: '64%',
                    left: '10%',
                    width: '80%',
                    height: '20%',
                    fontSize: '80%',
                    textAlign: 'left',
                    fontWeight: 'bold'
                }
            }]
        }]
    },{
        note: '',
        blocks: [{
            elements: [{
                type: 'text',
                value: 'Fork me on github!!',
                style: {
                    top: '30%',
                    width: '100%',
                    fontSize: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }
            },{
                type: 'link',
                value: 'https://github.com/masawada/Eggnog',
                href: 'https://github.com/masawada/Eggnog',
                style: {
                    top: '45%',
                    width: '100%',
                    fontSize: '60%',
                    textAlign: 'center'
                }
            },{
                type: 'tag',
                tag: '<a href="https://github.com/masawada/Eggnog"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://a248.e.akamai.net/assets.github.com/img/71eeaab9d563c2b3c590319b398dd35683265e85/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub"></a>'
            }]
        }]
    }];
    
    return slide;
})();