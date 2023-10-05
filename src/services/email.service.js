import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const loggedInUser = {
    email: "dor.eden@gmail.com",
    fullname: "Dor",
};

export const emailService = {
    createEmail,
    getById,
    save,
    remove,
    query,
    getDefaultFilter,
    getEmailsCounts
}

const STORAGE_KEY = 'emails'

_createEmails()


async function query(filterBy, folderId) {
    let emails = await storageService.query(STORAGE_KEY);
    if (filterBy) {
        let { to, body } = filterBy;
        to = loggedInUser.email;

        emails = emails.filter(
            (email) =>
                email.body.toLowerCase().includes(body.toLowerCase()) && email.to === to
        );

        //TODO change to switch case //
        if (folderId === "inbox") {
            emails = emails.filter(email => email.to == loggedInUser.email && email.removedAt === null && email.sentAt !== null)
        }

        if (folderId === "starred") {
            emails = emails.filter(email => email.isStarred === true)
        }

        if (folderId === "sent") {
            emails = emails.filter(email => email.from === loggedInUser.email && email.removedAt === null && email.sentAt != null)
        }

        if (folderId === "drafts") {
            emails = emails.filter(email => email.sentAt === null && email.removedAt === null)
        }

        if (folderId === "trash") {
            emails = emails.filter(email => email.removedAt !== null)
        }

    }
    return emails
}

//Search By ID Email From Storage
function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}


//Remove Emails From Storage
function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

//Save New Emails to storage
function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        to: loggedInUser,
        body: "",
    };
}

async function getEmailsCounts() {
    let emails = await storageService.query(STORAGE_KEY);
    const countMap = emails.reduce((acc, email) => {
        if (!email.isRead && email.to == loggedInUser.email && email.removedAt === null && email.sentAt !== null) {
            acc.Inbox++
        }
        if (email.isStarred) {
            acc.Starred++
        }

        if (email.from === loggedInUser.email && email.removedAt === null && email.sentAt != null) {
            acc.Sent++
        }


        if (email.sentAt === null && email.removedAt === null) {
            acc.Drafts++
        }

        if (email.removedAt !== null) {
            acc.Trash++
        }

        return acc
    }, {
        Inbox: 0,
        Starred: 0,
        Sent: 0,
        Drafts: 0,
        Trash: 0,
    })
    return countMap
}

function createEmail(subject = '', body = '', isRead = false, isStarred = false, sentAt = Date.now(), removedAt = null, from = '', to = '') {
    return {
        subject,
        body,
        sentAt,
        from:"dor.eden@gmail.com",
        to,
        isRead,
        isStarred,
        sentAt,
        removedAt

    }
}


function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e1',
                subject: 'gmail',
                body: 'we welcome you to our new app!',
                isRead: true,
                isStarred: false,
                sentAt: 512354534,
                removedAt: null,
                from: 'support@gmail.com',
                to: 'dor.eden@gmail.com'
            },
            {
                id: 'e2',
                subject: 'gmail',
                body: 'make sure to check all our new updates',
                isRead: false,
                isStarred: true,
                sentAt: 1566545,
                removedAt: null,
                from: 'service@gmail.com',
                to: 'dor.eden@gmail.com'
            },
            {
                id: 'e3',
                subject: 'promoting',
                body: 'check this new features',
                isRead: false,
                isStarred: false,
                sentAt: 1546148,
                removedAt: null,
                from: 'promoting@gmail.com',
                to: 'dor.eden@gmail.com'
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)

    }

}