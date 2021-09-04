import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import './ContactForm.scss';

import Content from 'components/content/Content';
import Hr from 'patterns/hr/Hr';

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
    let inquiryIndex = 0;
    let termsIndex = 0;
    const formEndPoint = 'https://getform.io/f/149f3856-bb7e-4ca3-958a-e006af3a2202';

    return (
        <>
            <form action={formEndPoint} method="POST">
                <fieldset>
                    {formSubtitle1 && (
                        <legend>{formSubtitle1}</legend>
                    )}
                    <label>First name<br /><input type="text" name="first_name" /></label>
                    <label>Last name<br /><input type="text" name="last_name" /></label>
                    <label>Company<br /><input type="text" name="company" /></label>
                    <label>Job title<br /><input type="text" name="job_title" /></label>
                    <label>Phone number<br /><input type="tel" name="phone_number" /></label>
                    <label>Work email<br /><input type="email" name="work_email" /></label>
                </fieldset>
                <Hr />
                <fieldset className="g_checkboxes">
                    {formSubtitle2 && (
                        <legend>{formSubtitle2}</legend>
                    )}
                    {formInquiryOptions.map(({ form_enquiry_option, form_enquiry_option_short }) => {
                        inquiryIndex++;
                        const optionText = form_enquiry_option?.text;
                        const optionShortText = form_enquiry_option_short?.text;

                        return (
                            <label className="b-contain" key={`${optionText}${inquiryIndex}`}>
                                <span>{optionText}</span>
                                <input type="checkbox" name={`inquiry_type_${inquiryIndex}`} value={(optionShortText) ? optionShortText : optionText} />
                                <div className="b-input"></div>
                            </label>
                        );
                    })}
                    <label className="g_textarea">Your message<br /><textarea name="message" rows="4" ></textarea></label>
                </fieldset>
                <Hr />
                <fieldset className="g_checkboxes">
                    {formConfirmationOptions.map(({ form_confirmation_option, form_confirmation_option_short, form_confirmation_option_required }) => {
                        termsIndex++;
                        const optionRaw = form_confirmation_option?.raw;
                        const optionText = form_confirmation_option?.text;
                        const optionShortText = form_confirmation_option_short?.text;
                        const isRequired = form_confirmation_option_required;

                        return (
                            <label className="b-contain" key={`${optionText}${termsIndex}`}>
                                <span><Content content={optionRaw} /></span>
                                <input type="checkbox" name={`terms_${termsIndex}`} value={(optionShortText) ? optionShortText : optionText} required={isRequired} />
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
