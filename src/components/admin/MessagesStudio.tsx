import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactMessage } from '../../types';
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  Download, 
  Search, 
  Clock, 
  Reply, 
} from 'lucide-react';

export const MessagesStudio: React.FC = () => {
  const { data, markMessageAsRead, markMessageAsUnread, deleteMessage, exportMessagesCSV } = usePortfolio();
  
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(data.contactMessages[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredMessages = data.contactMessages.filter((msg) => {
    const matchesFilter = filter === 'all' || (filter === 'unread' ? !msg.isRead : msg.isRead);
    const matchesSearch = searchQuery === '' || 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markMessageAsRead(msg.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
        <div>
          <div className="text-xs font-mono-code text-[#9A7B61] uppercase tracking-wider mb-1">
            06 / VISITOR MESSAGES & INQUIRIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-normal">
            Visitor Inbox
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportMessagesCSV}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-[#201D1A] hover:text-[#9A7B61] bg-white hover:bg-[#FAF8F5] border border-[#E2D9CC] transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#9A7B61]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Split Mailbox / Editorial Linear Style Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-[#E7E0D5] overflow-hidden min-h-[600px] shadow-2xs">
        
        {/* Left Messages List Column */}
        <div className="lg:col-span-5 border-r border-[#E7E0D5] flex flex-col bg-[#FCFBF9]">
          
          {/* Search & Filter Bar */}
          <div className="p-4 border-b border-[#E7E0D5] space-y-3 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9C948A]" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#201D1A] placeholder-[#9C948A] focus:border-[#201D1A] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {(['all', 'unread', 'read'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer uppercase ${
                    filter === f
                      ? 'bg-[#201D1A] text-white font-medium shadow-xs'
                      : 'text-[#6B645C] hover:text-[#201D1A] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E7E0D5]">
            {filteredMessages.length === 0 ? (
              <div className="py-16 text-center text-[#9C948A] text-xs font-mono-code">
                No messages found.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 transition-colors cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-[#F4EFE6] border-l-4 border-[#9A7B61]'
                        : 'hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-medium ${!msg.isRead ? 'text-[#7C5E47] font-semibold' : 'text-[#201D1A]'}`}>
                        {msg.name}
                      </span>
                      <span className="text-[10px] font-mono-code text-[#9C948A]">
                        {msg.timestamp}
                      </span>
                    </div>

                    <div className="text-xs font-serif text-[#201D1A] font-medium line-clamp-1">
                      {msg.subject || 'Direct Inquiry'}
                    </div>

                    <div className="text-xs text-[#6B645C] line-clamp-2 leading-relaxed">
                      {msg.message}
                    </div>

                    {!msg.isRead && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-[#7C5E47] mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B61]" />
                        <span>Unread Note</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Message Reader Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
          {selectedMessage ? (
            <div className="space-y-6">
              
              {/* Header Details */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#E7E0D5]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#201D1A] font-normal">
                    {selectedMessage.subject || 'Direct Portfolio Message'}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#6B645C] font-mono-code mt-1.5">
                    <span className="text-[#7C5E47] font-medium">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-[11px] font-mono-code text-[#9C948A] mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Received at {selectedMessage.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (selectedMessage.isRead) {
                        markMessageAsUnread(selectedMessage.id);
                      } else {
                        markMessageAsRead(selectedMessage.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4EFE6] text-[#6B645C] hover:text-[#201D1A] border border-[#E2D9CC] transition-colors cursor-pointer"
                    title={selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {selectedMessage.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      deleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] text-sm text-[#38332E] leading-relaxed whitespace-pre-wrap font-sans">
                {selectedMessage.message}
              </div>

              {/* Quick Reply CTA */}
              <div className="pt-4 border-t border-[#E7E0D5] flex items-center justify-between">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#201D1A] hover:bg-[#34302C] shadow-2xs transition-colors"
                >
                  <Reply className="w-3.5 h-3.5 text-[#C4A482]" />
                  <span>Reply via Default Mail Client</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="py-24 text-center text-[#9C948A] text-xs font-mono-code">
              Select a message from the list to read details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

