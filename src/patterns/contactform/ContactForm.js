import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './ContactForm.scss';

const Content= loadable(() => import('components/content/Content'));
const Hr = loadable(() => import('patterns/hr/Hr'));

const defaultProps = {
    formSubtitle1: '',
    formSubtitle2: '',
    formInquiryOptions: [],
    formConfirmationOptions: [],
};

const propTypes = {
    formSubtitle1: PropTypes.string,
    formSubtitle2: PropTypes.string,
    formInquiryOptions: PropTypes.array,
    formConfirmationOptions: PropTypes.array,
};

function ContactForm({
    formSubtitle1,
    formSubtitle2,
    formInquiryOptions,
    formConfirmationOptions,
}) {
    let index = 0;

    return (
        <>
            <form>
                <fieldset>
                    {formSubtitle1 && (
                        <legend>{formSubtitle1}</legend>
                    )}
                    <label>First name<br /><input type="text" name="firstName" /></label>
                    <label>Last name<br /><input type="text" name="lastName" /></label>
                    <label>Company<br /><input type="text" name="company" /></label>
                    <label>Job title<br /><input type="text" name="jobTitle" /></label>
                    <label>Phone number<br /><input type="tel" name="phoneNumber" /></label>
                    <label>Work email<br /><input type="email" name="workEmail" /></label>
                </fieldset>
                <Hr />
                <fieldset className="g_checkboxes">
                    {formSubtitle2 && (
                        <legend>{formSubtitle2}</legend>
                    )}
                    {formInquiryOptions.map(({ form_enquiry_option }) => {
                        index++;
                        const optionText = form_enquiry_option?.text;

                        return (
                            <label className="b-contain" key={`${optionText}${index}`}>
                                <span>{optionText}</span>
                                <input type="checkbox" name={`inquiryType_${optionText.toLowerCase().replace(/[^A-Z0-9]+/ig, "_")}`} value={optionText} />
                                <div className="b-input"></div>
                            </label>
                        );
                    })}
                    <label className="g_textarea">Your message<br /><textarea name="textArea" rows="4" ></textarea></label>
                </fieldset>
                <Hr />
                <fieldset className="g_checkboxes">
                    {formConfirmationOptions.map(({ form_confirmation_option }) => {
                        index++;
                        const optionRaw = form_confirmation_option?.raw;
                        const optionText = form_confirmation_option?.text;

                        return (
                            <label className="b-contain" key={`${optionText}${index}`}>
                                <span><Content content={optionRaw} /></span>
                                <input type="checkbox" name={`inquiryType_${optionText.toLowerCase().replace(/[^A-Z0-9]+/ig, "_")}`} value={optionText} />
                                <div className="b-input"></div>
                            </label>
                        );
                    })}
                    <button className="button" type="submit">Submit</button>
                </fieldset>
            </form>
        </>
    );
}

ContactForm.propTypes = propTypes;
ContactForm.defaultProps = defaultProps;

export default ContactForm;
