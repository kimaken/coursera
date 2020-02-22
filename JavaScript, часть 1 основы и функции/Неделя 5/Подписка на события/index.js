module.exports = {
    events: [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.events.push({
            name: event,
            subscriber: subscriber,
            handler: handler.bind(subscriber)
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        this.events = this.events.filter(function(elem) {
            if (elem.name === event && elem.subscriber === subscriber) {
                return false;
            }
            return true;
        });
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        this.events.forEach(function(elem) {
            if (elem.name === event) {
                elem.handler();
            }
        });
        return this;
    }
};
