import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const loggedinUser = {
    email: "dor.eden@gmail.com",
    fullname: "Admin",
};

export const emailService = {
    createEmail,
    getById,
    save,
    remove,
    query,
    getDefaultFilter,
}

const STORAGE_KEY = 'emails'

_createEmails()


async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY);
    if (filterBy) {
        let { to, body } = filterBy;
        to = loggedinUser.email;
         
        emails = emails.filter(
            (email) =>
                email.body.toLowerCase().includes(body.toLowerCase()) && email.to === to
        );

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
        to: loggedinUser,
        body: "",
    };
}

function createEmail(subject = '', body = '', isRead = false, isStarred = false, sentAt = '', removedAt = null, from = '', to = '') {
    return {
        subject,
        body,
        sentAt,
        from,
        to,
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