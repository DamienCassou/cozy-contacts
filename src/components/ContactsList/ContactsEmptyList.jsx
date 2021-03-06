/* global cozy */
import React from 'react'
import { Empty, Button } from 'cozy-ui/transpiled/react'
import EmptyIcon from '../../assets/icons/empty-contact-list.svg'
import IconTeam from '../../assets/icons/team.svg'
import ImportGoogleButton from '../Buttons/ImportGoogleButton'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import withModalContainer from '../HOCs/withModal'
import ContactImportationModal from '../ContactImportationModal/'
const style = { pointerEvents: 'all' }

class ContactsEmptyList extends React.Component {
  state = {
    hasConnector: false
  }

  componentDidMount() {
    // cozy-client-js is needed for intents
    // we should refactor to not duplicate initialization code (see src/targets/browser/index.jsx)
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    cozy.client.init({
      cozyURL: `${window.location.protocol}//${data.cozyDomain}`,
      token: data.cozyToken
    })
  }

  afterConnection = result => {
    this.setState({ hasConnector: result !== null })
    setTimeout(() => window.location.reload(), 15000)
  }

  render() {
    const { hasConnector } = this.state
    const { t, showModal } = this.props

    return (
      <Empty
        className="contacts-empty"
        icon={EmptyIcon}
        title={t('empty.title')}
        text={hasConnector ? t('empty.after') : ''}
      >
        {!hasConnector && (
          <div className="contacts-empty-actions-wrapper">
            <span className="contacts-empty-action">
              <ImportGoogleButton onComplete={this.afterConnection} />
            </span>
            <span className="contacts-empty-action">
              <Button
                className="contacts-empty-button"
                onClick={() => {
                  showModal(
                    <ContactImportationModal
                      closeAction={this.props.hideModal}
                    />
                  )
                }}
                label={t('empty.importation')}
                theme="secondary"
                icon={IconTeam}
                style={style}
              />
            </span>
          </div>
        )}
      </Empty>
    )
  }
}

export default translate()(withModalContainer(ContactsEmptyList))
